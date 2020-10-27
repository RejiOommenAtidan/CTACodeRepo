import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Fab,
  InputAdornment,
  TextField,
  FormControl
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class LivePreviewExample extends Component {
  state = {
    value: 'Input value to be copied here...',
    copied: false,

    value2: 'Input with side button & icon',
    copied2: false
  };

  render() {
    return (
      <>
        {this.state.copied ? (
          <Alert className="mb-4" severity="success">
            <span>
              The input had the <b>{this.state.value}</b> content which was
              copied successfully!
            </span>
          </Alert>
        ) : null}
        {this.state.copied2 ? (
          <Alert className="mb-4" severity="warning">
            <span>
              The input had the <b>{this.state.value2}</b> content which was
              copied successfully!
            </span>
          </Alert>
        ) : null}

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <div className="font-weight-bold font-size-lg mb-3">
              Content source
            </div>
            <FormControl className="w-100" variant="outlined">
              <TextField
                variant="outlined"
                value={this.state.value}
                fullWidth
                onChange={({ target: { value } }) =>
                  this.setState({ value, copied: false })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CopyToClipboard
                        text={this.state.value}
                        onCopy={() => this.setState({ copied: true })}>
                        <Fab size="small" color="primary">
                          <FontAwesomeIcon icon={['fas', 'save']} />
                        </Fab>
                      </CopyToClipboard>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="font-weight-bold font-size-lg mb-3">Test copy</div>
            <Alert className="mb-4" severity="warning">
              Paste here the content you copied when you clicked the "Copy"
              button.
            </Alert>
            <TextField
              label="Clipboard test"
              multiline
              rows="4"
              fullWidth
              defaultValue="Paste here what you copied!"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </>
    );
  }
}
