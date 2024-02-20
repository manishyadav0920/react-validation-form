import React from 'react';
import { TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const UrlLink = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = evt => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configUrlInput = {
    ...field,
    ...otherProps,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
    type: 'url', // Set input type to URL
    label: 'Website URL', // Label for the input field
  };

  if (meta && meta.touched && meta.error) {
    configUrlInput.error = true;
    configUrlInput.helperText = meta.error;
  }

  return <TextField {...configUrlInput} />;
};

export default UrlLink;
