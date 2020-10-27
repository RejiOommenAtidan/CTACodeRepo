import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Container,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Card,
  MenuItem,
  Button,
  Tooltip,
  TextField,
  FormControl,
  Select
} from '@material-ui/core';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';

const Step1 = () => {
  return (
    <>
      <Container>
        <div className="p-4">
          <h5 className="font-size-xl mb-1 font-weight-bold">
            Personal information
          </h5>
          <p className="text-black-50 mb-4">
            Small section summary description can be added here!
          </p>
          <Grid container spacing={6}>
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};
const Step2 = () => {
  const [state, setState] = useState('');

  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <>
      <Container>
        <div className="p-4">
          <h5 className="font-size-xl mb-1 font-weight-bold">
            Billing information
          </h5>
          <p className="text-black-50 mb-4">Wonderful transition effects.</p>
          <Grid container spacing={6}>
            <Grid item md={12}>
              <TextField
                fullWidth
                label="Address 2"
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid item md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  State
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={state}
                  onChange={handleChange}
                  label="State">
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value={10}>California</MenuItem>
                  <MenuItem value={20}>Texas</MenuItem>
                  <MenuItem value={30}>Alabama</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={3}>
              <TextField fullWidth label="Zip" variant="outlined" />
            </Grid>
            <Grid item md={12} className="pt-0">
              <FormControlLabel
                control={<Checkbox name="checkedC" />}
                label="Check me out"
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};
const Step3 = () => {
  return (
    <>
      <Container>
        <div className="p-4">
          <h5 className="font-size-xl mb-1 font-weight-bold">
            Payment details
          </h5>
          <p className="text-black-50 mb-4">
            The next and previous buttons help you to navigate through your
            content.
          </p>
          <Grid container spacing={6}>
            <Grid item md={12}>
              <TextField
                fullWidth
                label="Credit card number"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6}>
              <TextField fullWidth label="Name on card" variant="outlined" />
            </Grid>
            <Grid item md={3}>
              <TextField fullWidth label="Exp. date" variant="outlined" />
            </Grid>
            <Grid item md={3}>
              <TextField fullWidth label="CVC/CVV" variant="outlined" />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

function StepIcon(props) {
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />
  };

  return (
    <div
      className={clsx(
        'd-50 transition-base d-flex align-items-center bg-gray-400 justify-content-center rounded',
        {
          'd-80 bg-primary text-white shadow-primary-sm': active,
          'd-50 bg-success text-white shadow-success-sm': completed
        }
      )}>
      {completed ? <Check className="completed" /> : icons[String(props.icon)]}
    </div>
  );
}

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

function getSteps() {
  return ['Personal Information', 'Billing Information', 'Payment Details'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return <Step3 />;
    default:
      return <Step1 />;
  }
}

export default function LivePreviewExample() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Card className="card-box">
      <div className="card-header">
        <div className="card-header--title">
          <small>Wizards 1</small>
          <b>Example number 1 for steppers</b>
        </div>
        <div className="card-header--actions">
          <Tooltip title="Add new">
            <Button size="small" className="btn-primary d-30 p-0 btn-icon">
              <FontAwesomeIcon icon={['fas', 'plus-circle']} />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div>
        <div className="bg-secondary mb-3">
          <Stepper
            className="stepper-horizontal-1"
            alternativeLabel
            activeStep={activeStep}
            connector={<StepConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        {activeStep === steps.length ? (
          <div className="text-center p-5">
            <div className="avatar-icon-wrapper rounded-circle m-0">
              <div className="d-inline-flex justify-content-center p-0 rounded-circle btn-icon avatar-icon-wrapper bg-neutral-warning text-warning m-0 d-130">
                <FontAwesomeIcon
                  icon={['far', 'lightbulb']}
                  className="d-flex align-self-center display-3"
                />
              </div>
            </div>
            <h4 className="font-weight-bold mt-4">You finished all steps!</h4>
            <p className="mb-0 font-size-lg text-muted">
              Customize your stepper fast and easy!
            </p>
            <div className="pt-4">
              <Button
                onClick={handleReset}
                className="btn-warning font-weight-bold rounded hover-scale-lg mx-1"
                size="large">
                <span className="btn-wrapper--label">Reset Stepper</span>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div>{getStepContent(activeStep)}</div>
            <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
              <Button
                disabled={activeStep === 0}
                className="btn-primary font-weight-bold"
                onClick={handleBack}>
                Back
              </Button>
              <Button
                className="btn-primary font-weight-bold"
                onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
