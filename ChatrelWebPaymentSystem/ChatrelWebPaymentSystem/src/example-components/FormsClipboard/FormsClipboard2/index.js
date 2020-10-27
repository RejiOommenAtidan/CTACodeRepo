import React, { Component } from 'react';

import { Grid, Button, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class LivePreviewExample extends Component {
  state = {
    value:
      'Dummy content to be copied on button click! Write something else here...',
    copied: false
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

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <div className="font-weight-bold font-size-lg mb-3">
              Content source
            </div>
            <TextField
              label="Textarea Copy"
              multiline
              rows="4"
              fullWidth
              onChange={({ target: { value } }) =>
                this.setState({ value, copied: false })
              }
              defaultValue={this.state.value}
              variant="outlined"
            />
            <div className="text-center mt-4">
              <CopyToClipboard
                text={this.state.value}
                onCopy={() => this.setState({ copied: true })}>
                <Button className="btn-primary">
                  Copy content from textarea
                </Button>
              </CopyToClipboard>
            </div>
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
