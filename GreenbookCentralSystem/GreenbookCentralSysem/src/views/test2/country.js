import React, { useRef, useState, useMemo, useEffect } from 'react'
import JoditEditor from 'jodit-react'

const  Editor = (props) => {
  const editor = useRef(null);
  const {content, setContent} = props;
  const config = {   
    removeButtons: ['file','image','video','source','link','symbol','about'],
    showXPathInStatusbar: false,
    
  };
 return useMemo( () => ( 

  <JoditEditor ref={editor} value={content} config={config} onChange={(newContent) => {setContent(newContent);}} /> 


), [] )
}

export default Editor