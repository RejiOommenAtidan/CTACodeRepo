import React from 'react';

import { Card, List, ListItem } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { useDropzone } from 'react-dropzone';

import PublishTwoToneIcon from '@material-ui/icons/PublishTwoTone';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import CheckIcon from '@material-ui/icons/Check';

export default function LivePreviewExample() {
  const {
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: 'image/jpeg, image/png'
  });

  const files = acceptedFiles.map((file) => (
    <ListItem
      className="font-size-sm px-3 py-2 text-primary d-flex justify-content-between align-items-center"
      key={file.path}>
      <span>{file.path}</span>{' '}
      <span className="badge badge-pill bg-neutral-warning text-warning">
        {file.size} bytes
      </span>
    </ListItem>
  ));

  return (
    <>
      <Card className="mt-4 p-3 p-lg-5 shadow-xxl">
        <div className="dropzone">
          <div {...getRootProps({ className: 'dropzone-upload-wrapper' })}>
            <input {...getInputProps()} />
            <div className="dropzone-inner-wrapper bg-white">
              {isDragAccept && (
                <div>
                  <div className="d-140 hover-scale-lg icon-blob icon-blob-animated btn-icon text-success mx-auto">
                    <svg
                      className="d-140 opacity-2"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(300,300)">
                        <path
                          d="M170.4,-137.2C213.2,-82.3,234.8,-11.9,223.6,56.7C212.4,125.2,168.5,191.9,104.3,226.6C40.2,261.3,-44.1,264,-104,229.8C-163.9,195.7,-199.4,124.6,-216.2,49.8C-233,-25.1,-231,-103.9,-191.9,-158C-152.7,-212.1,-76.4,-241.6,-6.3,-236.6C63.8,-231.6,127.7,-192.2,170.4,-137.2Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="blob-icon-wrapper">
                      <CheckIcon className="d-50" />
                    </div>
                  </div>
                  <div className="font-size-sm text-success">
                    All files will be uploaded!
                  </div>
                </div>
              )}
              {isDragReject && (
                <div>
                  <div className="d-140 hover-scale-lg icon-blob icon-blob-animated btn-icon text-danger mx-auto">
                    <svg
                      className="d-140 opacity-2"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(300,300)">
                        <path
                          d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="blob-icon-wrapper">
                      <CloseTwoToneIcon className="d-50" />
                    </div>
                  </div>
                  <div className="font-size-sm text-danger">
                    Some files will be rejected!
                  </div>
                </div>
              )}
              {!isDragActive && (
                <div>
                  <div className="d-140 hover-scale-lg icon-blob btn-icon text-first mx-auto">
                    <svg
                      className="d-140 opacity-2"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(300,300)">
                        <path
                          d="M171.2,-128.5C210.5,-87.2,223.2,-16.7,205.1,40.4C186.9,97.5,137.9,141.1,81.7,167.2C25.5,193.4,-38,202.1,-96.1,181.2C-154.1,160.3,-206.7,109.7,-217.3,52.7C-227.9,-4.4,-196.4,-68,-153.2,-110.2C-110,-152.4,-55,-173.2,5.5,-177.5C65.9,-181.9,131.9,-169.8,171.2,-128.5Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="blob-icon-wrapper">
                      <PublishTwoToneIcon className="d-50" />
                    </div>
                  </div>
                  <div className="font-size-sm">
                    Drag some images to see the animated effects!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="font-weight-bold my-4 text-uppercase text-dark font-size-sm text-center">
            Uploaded Files
          </div>
          {files.length <= 0 && (
            <div className="text-info text-center font-size-sm">
              Uploaded demo files will appear here!
            </div>
          )}
          {files.length > 0 && (
            <div>
              <Alert severity="success" className="text-center mb-3">
                You have uploaded <b>{files.length}</b> files!
              </Alert>
              <List component="div" className="font-size-sm">
                {files}
              </List>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
