import React, { useRef, useState, useMemo, useEffect } from 'react'
import JoditEditor from 'jodit-react'

const  Editor = (props) => {
  const editor = useRef(null);
  const {content, setContent} = props;
  console.log(content);
  const config = {   
    removeButtons: ['file','image','video','source','link','symbol','about','copyformat','cut','paste','table','fullsize','print','font','selectall','copy'],
    showXPathInStatusbar: false,
    minHeight: 500,
    askBeforePasteHTML: false,
    defaultActionOnPaste: "insert_only_text",
    style: { fontSize: "24px",color:'black' }
  };

 return useMemo( () => ( 

  <JoditEditor ref={editor} id='editor' value={content}  config={config} onChange={(newContent) => {setContent(newContent);}} /> 


), [] )
}

export default Editor