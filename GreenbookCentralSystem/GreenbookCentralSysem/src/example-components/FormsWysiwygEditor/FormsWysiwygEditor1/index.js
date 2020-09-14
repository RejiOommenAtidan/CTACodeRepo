import React, { useState } from 'react';

import ReactQuill from 'react-quill';

export default function LivePreviewExample() {
  const [value, setValue] = useState('');

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Example placeholder..."
      />
    </>
  );
}
