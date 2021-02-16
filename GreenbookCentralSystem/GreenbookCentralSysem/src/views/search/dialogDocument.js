import React, { useState } from 'react';
import {
    Grid,
    Button,
    FormControl,
    TextField,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import { sButtonColor, sButtonSize, sButtonVariant } from '../../config/commonConfig';
import { useSelector } from 'react-redux';

export const AddDocumentDialog = (props) => {
    const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
    const { register, handleSubmit, errors, formState } = useForm();
    const handleSubmitAddDocumentRecord = () => {
        let resultNameTemp = lGBDocument.find(document => document.sTitle === sTitle);
        //console.log(resultNameTemp);
        //setResultName(resultNameTemp);
        
        if (resultNameTemp){
            setResultName('File name already exists');
            //console.log("No");
            setsTitle("");
            setsFileExtension("");
            setbinFileDoc("")
            return false
        }
        else if(binFileDoc){
            //console.log("Yes");
            
            props.addDocumentAPICall({
                sGBID: props.sGBID,
                sTitle: sTitle,
                sDocType: sDocType,
                binFileDoc: binFileDoc,
                sFileExtension: sFileExtension,
                nRegisterDate: nRegisterDate,
                nEnteredBy: userId,
                nUpdatedBy: userId
            });
        }
        else{
            setResultName('Please select a file');
            //console.log("No");
            setsTitle("");
            setsFileExtension("");
            setbinFileDoc("")
            return false
        }
     
    };


    const [sAccept, setsAccept] = useState("application/msword, application/pdf");
    const [sTitle, setsTitle] = useState("");
    const [sDocType, setsDocType] = useState("Support Document");
    const [binFileDoc, setbinFileDoc] = useState("");
    const [sFileExtension, setsFileExtension] = useState("");
    const [nRegisterDate, setnRegisterDate] = useState(0);
    const [lGBDocument, setlGBDocument] = useState(props.lGBDocument);

    let result = lGBDocument.find(document => document.sDocType === "Photo Identity");
    const [resultName, setResultName] = useState();
  
    const handleUploadChange = (event) => {
        let files = document.getElementById("id_binDocFile").files;
        let file;
        if (files) {
            for (var i = 0; i < files.length; i++) {
                file = files[i];
                reader.readAsDataURL(file);
                var Dot = file.name.lastIndexOf('.');
                var Name = file.name.slice(0, Dot);
                var Extension = file.type.split("/").pop()
                setsTitle(Name);
                setsFileExtension(Extension);
                setResultName();
            }
        }
    };

    const reader = new FileReader();

    reader.addEventListener("load", function () {
        setbinFileDoc(reader.result);
        //console.log(reader.result);
    }, false);

    const handleSelectChange = (event) => {
        setsDocType(event.target.value);
        setsTitle("");
        setsFileExtension("");
        setbinFileDoc("")
        if (event.target.value === "Photo Identity") {
            setsAccept("image/*");
        }
        else {
            setsAccept("application/msword, application/pdf");
        }
    };

    return (
        <Dialog fullWidth={true} maxWidth='md' open={props.addDocumentModal} onEscapeKeyDown={props.handleAddDocumentClickClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add a Photo/Document for {props.sGBID}</DialogTitle>
            <form onSubmit={handleSubmit(handleSubmitAddDocumentRecord)}>
                <DialogContent>
                    <DialogContentText>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl className={props.classes.formControl}>
                                    <InputLabel id="id_sDocType">{<>Document Type<span style={{ color: "red" }} > *</span></>}</InputLabel>
                                    <Select
                                        value={sDocType}
                                        id="id_sDocType"
                                        name="name_sDocType"
                                        label="Document Type"
                                        type="text"
                                        fullWidth
                                        margin="dense"
                                        className={props.classes.textField}
                                        onChange={(event) => { handleSelectChange(event) }}
                                    >
                                        <MenuItem value={"Support Document"}>Support Document</MenuItem>
                                        <MenuItem
                                            hidden={result !== undefined}
                                            value={"Photo Identity"}
                                        >Photo Identity</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={props.classes.formControl}>
                                    <label htmlFor="id_binDocFile">
                                        <input
                                            id="id_binDocFile"
                                            accept={sAccept}
                                            className={props.classes.textField}
                                            style={{ display: 'none' }}
                                            type="file"
                                            onChange={(event) => { handleUploadChange(event) }}
                                        />
                                        <Button color="primary" variant="contained" component="span">
                                            Upload {sDocType}
                                        </Button>
                                    </label>
                                </FormControl>
                            </Grid>
                            {sTitle !== "" && <Grid item xs={12}>
                                <FormControl className={props.classes.formControl}>
                                    <Typography
                                        variant="p"
                                        color="primary"
                                    >File Added for Upload, File Name: {sTitle}</Typography>
                                </FormControl>
                            </Grid>}
                            {resultName && <Grid item xs={12}>
                                <FormControl className={props.classes.formControl}>
                                    <Typography
                                        variant="p"
                                        style={{color:'red'}}   
                                    >{resultName}</Typography>
                                </FormControl>
                            </Grid>}
                            <Grid item xs={12} >
                                <FormControl className={props.classes.formControl}>
                                    <TextField
                                        id="id_sTitle"
                                        name="name_sTitle"
                                        label="Title"
                                        type="text"
                                        value={sTitle}
                                        onChange={(e) => { setsTitle(e.target.value) }}
                                        inputRef={register({
                                            required: true
                                        })}
                                       
                                    />
                                    {_.get("name_sTitle.type", errors) === "required" && (
                                        <span style={{ color: 'red' }}>This field is required</span>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={props.handleAddDocumentClickClose}
                        color={sButtonColor}
                        variant={sButtonVariant}
                        size={sButtonSize}
                    >Cancel</Button>
                    <Button
                        disabled={formState.isSubmitting && formState.isValid}
                        type="submit"
                        color={sButtonColor}
                        variant={sButtonVariant}
                        size={sButtonSize}
                    >Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}