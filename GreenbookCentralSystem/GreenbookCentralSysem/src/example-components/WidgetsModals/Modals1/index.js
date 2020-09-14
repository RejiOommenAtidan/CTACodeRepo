import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  InputAdornment,
  FormControlLabel,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  Button,
  List,
  ListItem,
  TextField,
  ListItemText,
  Divider
} from '@material-ui/core';

import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';

import AddIcon from '@material-ui/icons/Add';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonIcon from '@material-ui/icons/Person';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';

import DialogContentText from '@material-ui/core/DialogContentText';

const emails = ['example1@example.com', 'example2@example.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      classes={{ paper: 'modal-content rounded-lg' }}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <div className="p-3 font-size-xl font-weight-bold">
        Set backup account
      </div>
      <Divider />
      <List>
        {emails.map((email) => (
          <ListItem
            button
            onClick={() => handleListItemClick(email)}
            key={email}>
            <ListItemAvatar>
              <Avatar className="bg-first">
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default function LivePreviewExample() {
  // Example 1

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  // Example 2

  const [open1, setOpen1] = useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  // Example 3

  const [open2, setOpen2] = useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [checked1, setChecked1] = useState(true);

  const handleChange1 = (event) => {
    setChecked1(event.target.checked);
  };

  // Example 4

  const [open3, setOpen3] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleClickOpen3 = (scrollType) => () => {
    setOpen3(true);
    setScroll(scrollType);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open3) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open3]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Button className="m-2 btn-primary" onClick={handleClickOpen}>
          Open simple dialog
        </Button>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />

        <Button className="m-2 btn-primary" onClick={handleClickOpen1}>
          Open form dialog
        </Button>
        <Dialog
          classes={{ paper: 'modal-content bg-deep-sky rounded-lg modal-dark' }}
          open={open1}
          onClose={handleClose1}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Newsletter Subscribe</DialogTitle>
          <DialogContent className="p-4">
            <DialogContentText>
              Stay up to date with our latest news and updates by subscribing to
              our monthly newsletter
            </DialogContentText>
            <DialogContentText className="mb-0">
              <TextField
                className="text-white-50"
                variant="outlined"
                size="small"
                autoFocus
                margin="dense"
                id="input-with-icon-textfield134"
                label="Email Address"
                type="email"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailTwoToneIcon />
                    </InputAdornment>
                  )
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions className="p-4">
            <Button
              onClick={handleClose1}
              variant="text"
              className="bg-white-10 text-white mr-3 shadow-none">
              Cancel
            </Button>
            <Button onClick={handleClose1} className="btn-success shadow-none">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>

        <Button className="m-2 btn-primary" onClick={handleClickOpen2}>
          Open login form
        </Button>
        <Dialog
          classes={{ paper: 'modal-content' }}
          fullWidth
          maxWidth="md"
          open={open2}
          onClose={handleClose2}
          aria-labelledby="form-dialog-title2">
          <DialogContent className="p-0">
            <div>
              <div className="bg-secondary border-0">
                <div className="card-header d-block bg-white pt-4 pb-5">
                  <div className="text-muted text-center mb-3">
                    <span>Sign in with</span>
                  </div>
                  <div className="text-center">
                    <Button className="mr-2 btn-facebook">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fab', 'facebook']} />
                      </span>
                      <span className="btn-wrapper--label">Facebook</span>
                    </Button>
                    <Button className="ml-2 btn-twitter">
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fab', 'twitter']} />
                      </span>
                      <span className="btn-wrapper--label">Twitter</span>
                    </Button>
                  </div>
                </div>
                <div className="card-body px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-3">
                    <small>or sign in with credentials</small>
                  </div>
                  <div className="mb-3">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      id="textfield-email"
                      label="Email address"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineTwoToneIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      id="textfield-password"
                      label="Password"
                      type="password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockTwoToneIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center font-size-md">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked1}
                          onChange={handleChange1}
                          value="checked1"
                          color="primary"
                        />
                      }
                      label="Remember me"
                    />
                    <div>
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="text-first">
                        Recover
                      </a>
                    </div>
                  </div>
                  <div className="text-center">
                    <Button
                      variant="contained"
                      className="font-weight-bold btn-second px-4 my-2">
                      Sign in
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button className="m-2 btn-primary" onClick={handleClickOpen3('paper')}>
          Inner scroll
        </Button>
        <Button className="m-2 btn-primary" onClick={handleClickOpen3('body')}>
          Body scroll
        </Button>
        <Dialog
          open={open3}
          onClose={handleClose3}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description">
          <DialogTitle id="scroll-dialog-title">Scrollable Dialogs</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}>
              {[...new Array(50)]
                .map(
                  () =>
                    'Cras mattis consectetur purus sit amet fermentum.\n' +
                    'Cras justo odio, dapibus ac facilisis in, egestas eget quam.\n' +
                    'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.' +
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.'
                )
                .join('\n')}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="bg-secondary p-4">
            <Button
              onClick={handleClose3}
              size="small"
              className="btn-outline-dark mr-3">
              Cancel
            </Button>
            <Button onClick={handleClose3} className="btn-success">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
