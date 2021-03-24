import React, { useRef, useState, useMemo } from 'react'
import JoditEditor from 'jodit-react'
import Editor from '../test2/country';
import { ContactSupportOutlined } from '@material-ui/icons';
import { template } from 'lodash';
const Test = () => {
// const [data,setData]=React.useState();
  //  return (
  //    <>
  //   <Editor setData={setData} temp={'hi'} />
  //   <textarea value={data}></textarea>
  //   </>
  //  )
  const [content, setContent] = useState('hello world');
 
   return(
     <>
    <Editor  content={content} setContent={setContent} />
    <textarea value={content}></textarea>
    </>
   )
}

export default Test