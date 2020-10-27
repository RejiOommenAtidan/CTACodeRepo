import React from 'react';

import { Container, TextField } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <>
      <form noValidate autoComplete="off">
        <Container className="py-4">
          <TextField
            fullWidth
            error
            id="standard-error"
            label="Error"
            defaultValue="Hello World"
          />
        </Container>
        <Container className="py-4">
          <TextField
            fullWidth
            error
            id="standard-error-helper-text"
            label="Error"
            defaultValue="Hello World"
            helperText="Incorrect entry."
          />
        </Container>
        <Container className="py-4">
          <TextField
            fullWidth
            error
            id="filled-error"
            label="Error"
            defaultValue="Hello World"
            variant="filled"
          />
        </Container>
        <Container className="py-4">
          <TextField
            fullWidth
            error
            id="filled-error-helper-text"
            label="Error"
            defaultValue="Hello World"
            helperText="Incorrect entry."
            variant="filled"
          />
        </Container>
        <Container className="py-4">
          <TextField
            fullWidth
            error
            id="outlined-error"
            label="Error"
            defaultValue="Hello World"
            variant="outlined"
          />
        </Container>
        <Container className="py-4">
          <TextField
            fullWidth
            error
            id="outlined-error-helper-text"
            label="Error"
            defaultValue="Hello World"
            helperText="Incorrect entry."
            variant="outlined"
          />
        </Container>
      </form>
    </>
  );
}
