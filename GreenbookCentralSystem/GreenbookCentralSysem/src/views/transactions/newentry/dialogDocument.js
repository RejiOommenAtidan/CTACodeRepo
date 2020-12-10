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
import { sButtonColor, sButtonSize, sButtonVariant } from '../../../config/commonConfig';

export const AddDocumentDialog = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const handleSubmitAddDocumentRecord = () => {
        props.addDocumentAPICall({
            sGBID: props.sGBID,
            sTitle: sTitle,
            sDocType: sDocType,
            binFileDoc: binFileDoc,
            sFileExtension: sFileExtension,
            nRegisterDate: nRegisterDate
        });
    };

    const [sAccept, setsAccept] = useState("application/msword, application/pdf");
    const [sTitle, setsTitle] = useState("");
    const [sDocType, setsDocType] = useState("Support Document");
    const [binFileDoc, setbinFileDoc] = useState("");
    const [sFileExtension, setsFileExtension] = useState("");
    const [nRegisterDate, setnRegisterDate] = useState(0);
    const [lGBDocument, setlGBDocument] = useState(props.lGBDocument);

    let result = lGBDocument.find(document => document.sDocType === "Photo Identity");

    const handleUploadChange = (event) => {
        let files = document.getElementById("id_binDocFile").files;
        let file;
        if (files) {
            for (var i = 0; i < files.length; i++) {
                file = files[i];
                reader.readAsDataURL(file);
                //use var instead of let
                var Dot = file.name.lastIndexOf('.');
                var Name = file.name.slice(0, Dot);
                var Extension = file.type.split("/").pop()
                setsTitle(Name);
                setsFileExtension(Extension);
            }
        }
    };

    const reader = new FileReader();

    reader.addEventListener("load", function () {
        setbinFileDoc(reader.result);
        console.log(reader.result);
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
            <DialogTitle id="form-dialog-title">Add a Document for {props.sGBID}</DialogTitle>
            <form onSubmit={handleSubmit(handleSubmitAddDocumentRecord)}>
                <DialogContent>
                    <DialogContentText>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl className={props.classes.formControl}>
                                    <InputLabel id="id_sDocType">Document Type</InputLabel>
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
                                    >File Uploaded, File Name: {sTitle}</Typography>
                                </FormControl>
                            </Grid>}
                            {/*<Grid item xs={12} >
                                <FormControl className={props.classes.formControl}>
                                    <TextField
                                        id="id_nRegisterDate"
                                        name="name_nRegisterDate"
                                        label="Register Date"
                                        type="number"
                                        value={nRegisterDate}
                                        onChange={(e) => { setnRegisterDate(parseInt(e.target.value)) }}
                                        inputRef={register({
                                            required: true
                                        })}
                                    />
                                    {_.get("name_nRegisterDate.type", errors) === "required" && (
                                        <span style={{ color: 'red' }}>This field is required</span>
                                    )}
                                </FormControl>
                                    </Grid>*/}
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
                                        InputProps={{
                                            readOnly: true,
                                            disabled: true
                                        }}
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

export const EditDocumentDialog = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const handleSubmitEditDocumentRecord = () => {
        props.editDocumentAPICall(
            {
                id: props.oDocument.id,
                sGBID: props.oDocument.sGBID,
                sTitle: sTitle,
                sDocType: sDocType,
                binFileDoc: binFileDoc,
                sFileExtension: sFileExtension,
                nRegisterDate: nRegisterDate
            }
        );
    }

    const [sAccept, setsAccept] = useState(props.oDocument.sDocType === "Photo Identity" ? "image/*" : "application/msword, application/pdf");
    const [sTitle, setsTitle] = useState(props.oDocument.sTitle);
    const [sDocType, setsDocType] = useState(props.oDocument.sDocType);
    const [binFileDoc, setbinFileDoc] = useState(props.oDocument.binFileDoc);
    const [sFileExtension, setsFileExtension] = useState(props.oDocument.sFileExtension);
    const [nRegisterDate, setnRegisterDate] = useState(props.oDocument.nRegisterDate);

    const handleUploadChange = (event) => {
        let files = document.getElementById("id_binDocFile").files;
        let file;
        if (files) {
            for (var i = 0; i < files.length; i++) {
                file = files[i];
                reader.readAsDataURL(file);
                //use var instead of let
                var Dot = file.name.lastIndexOf('.');
                var Name = file.name.slice(0, Dot);
                var Extension = file.type.split("/").pop()
                setsTitle(Name);
                setsFileExtension(Extension);
            }
        }
    };

    const reader = new FileReader();

    reader.addEventListener("load", function () {
        setbinFileDoc(reader.result);
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
        <Dialog fullWidth={true} maxWidth='md' open={props.editDocumentModal} onEscapeKeyDown={props.handleEditDocumentClickClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Document for {props.oDocument.sGBID}</DialogTitle>
            <form onSubmit={handleSubmit(handleSubmitEditDocumentRecord)}>
                <DialogContent>
                    <DialogContentText>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl className={props.classes.formControl}>
                                    <InputLabel id="id_sDocType">Document Type</InputLabel>
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
                                        disabled
                                    >
                                    <MenuItem value={"Support Document"}>Support Document</MenuItem>
                                        <MenuItem value={"Photo Identity"}>Photo Identity</MenuItem>
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
                                    >File Uploaded, File Name: {sTitle}</Typography>
                                </FormControl>
                            </Grid>}
                            {/*<Grid item xs={12} >
                                <FormControl className={props.classes.formControl}>
                                    <TextField
                                        id="id_nRegisterDate"
                                        name="name_nRegisterDate"
                                        label="Register Date"
                                        type="number"
                                        value={nRegisterDate}
                                        onChange={(e) => { setnRegisterDate(parseInt(e.target.value)) }}
                                        inputRef={register({
                                            required: true
                                        })}
                                    />
                                    {_.get("name_nRegisterDate.type", errors) === "required" && (
                                        <span style={{ color: 'red' }}>This field is required</span>
                                    )}
                                </FormControl>
                                    </Grid>*/}
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
                                        InputProps={{
                                            readOnly: true,
                                            disabled: true
                                        }}
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
                        onClick={props.handleEditDocumentClickClose}
                        color={sButtonColor}
                        variant={sButtonVariant}
                        size={sButtonSize}
                    >Cancel</Button>
                    <Button
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