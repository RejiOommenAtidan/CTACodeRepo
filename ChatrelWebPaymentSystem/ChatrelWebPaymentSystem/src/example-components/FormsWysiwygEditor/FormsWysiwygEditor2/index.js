import React from 'react';

import { Input } from '@material-ui/core';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export default function LivePreviewExample() {
  const editorState = EditorState.createEmpty();

  return (
    <>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
      />

      <div className="divider my-4" />

      <Input
        type="textarea"
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      />
    </>
  );
}
