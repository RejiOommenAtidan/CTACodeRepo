import React, { useState } from 'react';

import { Container, Card, TextField } from '@material-ui/core';

export default function LivePreviewExample() {
  const [value, setValue] = useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Card className="p-5 shadow-xxl">
        <Container>
          <TextField
            variant="outlined"
            className="m-3"
            fullWidth
            id="standard-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax="4"
            value={value}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            className="m-3"
            fullWidth
            id="standard-textarea"
            label="Multiline Placeholder"
            placeholder="Placeholder"
            multiline
          />
          <TextField
            variant="outlined"
            className="m-3"
            fullWidth
            id="standard-multiline-static"
            label="Multiline"
            multiline
            rows="4"
            defaultValue="Default Value"
          />
        </Container>
      </Card>
    </>
  );
}
