import React, { useState, useRef } from 'react'
import axios from 'axios';

import { Box,Button } from "@mui/material";

function FileUpload({ aadhar, handleupl }) {

  console.log(aadhar);
  const formData = new FormData();
  const [isloading, setloading] = useState(false);
  const [color,setColor] = useState('#2C88D9');
  const inputRef = useRef(null);
  const saveFile = (e) => {
    console.log(e.target.files[0])
    for (var i = 0; i < e.target.files.length; i++) {
      formData.append('file', e.target.files[i]);
      formData.append("fileName", e.target.files[i].name);
      formData.append("Aadhar", aadhar);
      // for stateupdate
    }
    //console.log(formData)       
  };

  const uploadFile = async (e) => {
    setloading(true);
    setColor('#ADD8E6');
    console.log(e);
    // var options = { content: formData };
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/fileUpload",
        // options,
        formData
      );
      setloading(false);
      setColor('#2C88D9');
      inputRef.current.value = null;
   
      console.log(res);
      handleupl(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
        <input ref={inputRef} type="file" id='file' multiple onChange={saveFile} />
        <Button  onClick={uploadFile} disabled={isloading} style={{height: '40px',width:'140px',backgroundColor: `${color}`,color: '#fff',fontWeight :'600',fontSize: '16px'}} >
          {isloading && <span>Uploading</span>}
          {!isloading && <span>Upload</span>}
        </Button>
    </>
  )
}

export default FileUpload;

{/* <div className="border-dark" style={{ border: "2px solid", position: "absolute", left: "74rem", width: "340px" }}>
        <input ref={inputRef} type="file" id='file' multiple onChange={saveFile} style={{ margin: "20px 0px 0px 60px" }} /> */}
{/* {isloading ? "" : (<button className='btn btn-primary' style={{ margin: "20px 0px 20px 120px", backgroundColor: "#8d5ba7" }} onClick={uploadFile}>Upload</button>)}
        {isloading ? <img style={{ width: '20px', height: "20px" }} src="/loading.gif"></img> : ''} */}
{/* <button className='btn btn-success' style={{ margin: "20px 0px 20px 120px",}} onClick={uploadFile} disabled={isloading}>
          {isloading && <div class="spinner-border spinner-border-sm" role="status">
            <span class="sr-only"></span>
          </div>}
          {isloading && <span>Uploading</span>}
          {!isloading && <span>Upload</span>}
        </button>
      </div> */}