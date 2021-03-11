import React from 'react';
import {
  Grid,
  Button,
  FormControl,
  TextField,
  Checkbox,
  Switch
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from 'react-redux';
import { sButtonColor, sButtonSize, sButtonVariant } from "../../../config/commonConfig";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import _ from "lodash/fp";
import { useForm, Controller } from "react-hook-form";

export const AddDialog = (props) => {
  const { register, handleSubmit, errors, control, formState } = useForm();
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const [lUserRights, setlUserRights] = React.useState(props.lUserRights);
  const [Id, setId] = React.useState('')
  const [sUsername, setsUsername] = React.useState('');
  const [sFullname, setsFullname] = React.useState('');
  const [nUserRightsId, setnUserRightsId] = React.useState('');
  const [sUserRightsName, setsUserRightsName] = React.useState('');
  const [sPassword, setsPassword] = React.useState('');
  const [sOffice, setsOffice] = React.useState('');
  const [bActive, setbActive] = React.useState(true);
  const handleSubmitAddUserRecord = () => {
    props.addAPICall(
      {
        sUsername,
        sFullname,
        nUserRightsId,
        sPassword,
        sOffice,
        bActive,
        nEnteredBy: userId,
        nUpdatedBy: userId
      }
    )
  };
  return (
    <Dialog open={props.addModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add User</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitAddUserRecord)}>
        <DialogContent>
          <DialogContentText>
            <Grid container>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_sUsername"
                    name="name_sUsername"
                    label={<>Username<span style={{ color: 'red' }}> *</span></>}
                    type="text"
                    value={sUsername}
                    onChange={(e) => { setsUsername(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("name_sUsername.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_sFullname"
                    name="name_sFullname"
                    label={<>Full name<span style={{ color: 'red' }}> *</span></>}
                    type="text"
                    value={sFullname}
                    onChange={(e) => { setsFullname(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("name_sFullname.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_sPassword"
                    name="name_sPassword"
                    label={<>Password<span style={{ color: 'red' }}> *</span></>}
                    type="password"
                    value={sPassword}
                    onChange={(e) => { setsPassword(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("name_sPassword.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <InputLabel id="id_sGender">Role<span style={{ color: 'red' }}> *</span></InputLabel>
                  <Controller
                    render={props => (
                      <Select
                        id="id_nUserRightsId"
                        name="name_nUserRightsId"
                        label="Role"
                        value={nUserRightsId}
                        onChange={(e) => {
                          props.onChange(e.target.value);
                          setnUserRightsId(e.target.value);
                        }}

                      >
                        {lUserRights.map((right) => (
                          <MenuItem key={right.id} value={right.id}>
                            {right.sUserRightsName}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    name="name_nUserRightsIdController"
                    control={control}
                    rules={{ required: true }}
                  />
                  {errors.name_nUserRightsIdController && <span style={{ color: 'red' }}>This field is required</span>}
                  {/*{_.get("name_nUserRightsIdController.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}*/}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_sOffice"
                    name="name_sOffice"
                    label={<>Office Name<span style={{ color: 'red' }}> *</span></>}
                    type="text"
                    value={sOffice}
                    onChange={(e) => { setsOffice(e.target.value) }}
                    inputRef={register({
                      required: true
                    })}
                  />
                  {_.get("name_sOffice.type", errors) === "required" && (
                    <span style={{ color: 'red' }}>This field is required</span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          color={"primary"}
                          id="id_bActive"
                          checked={bActive}
                          onChange={(e) => { setbActive(e.target.checked) }}
                          name="name_bActive"
                        />
                      }
                      //labelPlacement="top"
                      label={
                        bActive ?
                          <>Status: Active</> :
                          <>Status: Inactive</>
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleAddClickClose}
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
          >Cancel</Button>
          <Button
            disabled={formState.isSubmitting && formState.isValid}
            type="submit"
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
          >Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export const EditDialog = (props) => {
  const { register, handleSubmit, errors, control, formState } = useForm();
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const [lUserRights, setlUserRights] = React.useState(props.oUserObj.lUserRights);
  const [Id, setId] = React.useState(props.oUserObj.id)
  const [sUsername, setsUsername] = React.useState(props.oUserObj.sUsername);
  const [sFullname, setsFullname] = React.useState(props.oUserObj.sFullname);
  const [nUserRightsId, setnUserRightsId] = React.useState(props.oUserObj.nUserRightsId);
  const [sUserRightsName, setsUserRightsName] = React.useState(props.oUserObj.sUserRightsName);
  const [sPassword, setsPassword] = React.useState(null);
  const [sOffice, setsOffice] = React.useState(props.oUserObj.sOffice);
  const [bActive, setbActive] = React.useState(props.oUserObj.bActive);
  const handleSubmitEditUserRecord = () => {
    props.editAPICall({
      Id,
      sUsername: props.oUserObj.sUsername,
      sFullname,
      nUserRightsId,
      sPassword,
      sOffice,
      bActive,
      nUpdatedBy: userId
    })
  };
  return (
    <Dialog open={props.editModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
      <form onSubmit={handleSubmit(handleSubmitEditUserRecord)}>
        <DialogContent>
          <DialogContentText>
            <div>
              <Grid container>
                <Grid item xs={12}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_sUsername"
                      name="name_sUsername"
                      label={<>Username<span style={{ color: 'red' }}> *</span></>}
                      type="text"
                      InputProps={{
                        readOnly: true,
                        disabled: true
                      }}
                      value={sUsername}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_sFullname"
                      name="name_sFullname"
                      label={<>Full name<span style={{ color: 'red' }}> *</span></>}
                      type="text"
                      value={sFullname}
                      onChange={(e) => { setsFullname(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("name_sFullname.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_sPassword"
                      name="name_sPassword"
                      label={<>Password<span style={{ color: 'red' }}> *</span></>}
                      type="password"
                      defaultValue={`1234567890`}
                      value={sPassword}
                      onChange={(e) => { setsPassword(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("name_sPassword.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={props.classes.formControl}>
                    <InputLabel id="id_sGender">Role<span style={{ color: 'red' }}> *</span></InputLabel>
                    <Select
                      id="id_nUserRightsId"
                      name="name_nUserRightsId"
                      label="Role"
                      value={nUserRightsId}
                      onChange={(e) => { setnUserRightsId(e.target.value) }}
                    >
                      {lUserRights.map((right) => (
                        <MenuItem key={right.id} value={right.id}>
                          {right.sUserRightsName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={props.classes.formControl}>
                    <TextField
                      id="id_sOffice"
                      name="name_sOffice"
                      label={<>Office Name<span style={{ color: 'red' }}> *</span></>}
                      type="text"
                      value={sOffice}
                      onChange={(e) => { setsOffice(e.target.value) }}
                      inputRef={register({
                        required: true
                      })}
                    />
                    {_.get("name_sOffice.type", errors) === "required" && (
                      <span style={{ color: 'red' }}>This field is required</span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={props.classes.formControl}>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            color={"primary"}
                            id="id_bActive"
                            checked={bActive}
                            onChange={(e) => { setbActive(e.target.checked) }}
                            name="name_bActive"
                          />
                        }
                        //labelPlacement="top"
                        label={
                          bActive ?
                            <>Status: Active</> :
                            <>Status: Inactive</>
                        }
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleEditClickClose}
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
          >Cancel</Button>
          <Button
            disabled={formState.isSubmitting && formState.isValid}
            type="submit"
            variant={sButtonVariant}
            color={sButtonColor}
            size={sButtonSize}
          >Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

{/*export const DeleteDialog = (props) => {
  console.log("Delete Dialog");
  return (
    <Dialog
      open={props.deleteModal}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle id="alert-dialog-slide-title">Confirm Operation</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete country {props.countryName} ?
        </DialogContentText>
      </DialogContent>
      <DialogActions >
        <Button onClick={props.handleClose} color="default">
          No
        </Button>
        <Button onClick={props.deleteAPICall} color="secondary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}*/}