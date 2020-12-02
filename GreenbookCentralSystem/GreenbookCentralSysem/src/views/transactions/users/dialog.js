import React from 'react';
import {
  Grid,
  Button,
  FormControl,
  TextField
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
import {
  oOptions, oTableIcons, sSnackbarAddMessage, sSnackbarUpdateMessages,
  sButtonColor, sButtonSize, sButtonVariant
} from "../../../config/commonConfig";

export const AddDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const [lUserRights, setlUserRights] = React.useState(props.lUserRights);
  const [Id, setId] = React.useState('')
  const [sUsername, setsUsername] = React.useState('');
  const [sFullname, setsFullname] = React.useState('');
  const [nUserRightsId, setnUserRightsId] = React.useState('');
  const [sUserRightsName, setsUserRightsName] = React.useState('');
  const [sPassword, setsPassword] = React.useState('');
  const [sOffice, setsOffice] = React.useState('');
  return (
    <Dialog open={props.addModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid item xs={12}>
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_sUsername"
                  label="Username"
                  type="text"
                  value={sUsername}
                  onChange={(e) => { setsUsername(e.target.value) }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_sFullname"
                  label="Fullname"
                  type="text"
                  value={sFullname}
                  onChange={(e) => { setsFullname(e.target.value) }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={props.classes.formControl}>
                <TextField
                  id="id_sPassword"
                  label="Password"
                  type="password"
                  value={sPassword}
                  onChange={(e) => { setsPassword(e.target.value) }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={props.classes.formControl}>
                <InputLabel id="id_sGender">Rights</InputLabel>
                <Select
                  id="id_nUserRightsId"
                  label="User Rights"
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
                  label="Office Name"
                  type="text"
                  value={sOffice}
                  onChange={(e) => { setsOffice(e.target.value) }}
                />
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
        <Button onClick={() => {
          props.addAPICall(
            {
              sUsername,
              sFullname,
              nUserRightsId,
              sPassword,
              sOffice,
              nEnteredBy: userId,
              nUpdatedBy: userId
            }
          )
        }}
          variant={sButtonVariant}
          color={sButtonColor}
          size={sButtonSize}
        >Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export const EditDialog = (props) => {
  const userId = useSelector(state => state.UserAuthenticationReducer.oUserAuth.oUser.id);
  const [lUserRights, setlUserRights] = React.useState(props.oUserObj.lUserRights);
  const [Id, setId] = React.useState(props.oUserObj.id)
  const [sUsername, setsUsername] = React.useState(props.oUserObj.sUsername);
  const [sFullname, setsFullname] = React.useState(props.oUserObj.sFullname);
  const [nUserRightsId, setnUserRightsId] = React.useState(props.oUserObj.nUserRightsId);
  const [sUserRightsName, setsUserRightsName] = React.useState(props.oUserObj.sUserRightsName);
  const [sPassword, setsPassword] = React.useState(props.oUserObj.sPassword);
  const [sOffice, setsOffice] = React.useState(props.oUserObj.sOffice);
  return (
    <Dialog open={props.editModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div>
            <Grid container>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_sUsername"
                    label="Username"
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
                    label="Fullname"
                    type="text"
                    value={sFullname}
                    onChange={(e) => { setsFullname(e.target.value) }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <TextField
                    id="id_sPassword"
                    label="Password"
                    type="password"
                    value={sPassword}
                    onChange={(e) => { setsPassword(e.target.value) }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={props.classes.formControl}>
                  <InputLabel id="id_sGender">Rights</InputLabel>
                  <Select
                    id="id_nUserRightsId"
                    label="User Rights"
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
                    label="Office Name"
                    type="text"
                    value={sOffice}
                    onChange={(e) => { setsOffice(e.target.value) }}
                  />
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
        <Button onClick={() => {
          props.editAPICall({
            Id,
            sUsername: props.oUserObj.sUsername,
            sFullname,
            nUserRightsId,
            sPassword,
            sOffice,
            nUpdatedBy: userId
          })
        }
        }
          variant={sButtonVariant}
          color={sButtonColor}
          size={sButtonSize}
        >Save</Button>
      </DialogActions>
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