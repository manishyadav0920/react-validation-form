import * as React from 'react';
import { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FileUploadButton = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFieldValue(name, file); // Set Formik field value
  };

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        {...otherProps}
      >
        {selectedFile ? selectedFile.name : 'Upload file'}
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          name={field.name}
        />
      </Button>
    </div>
  );
};

export default FileUploadButton;
