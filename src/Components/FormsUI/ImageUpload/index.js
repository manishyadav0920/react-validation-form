import * as React from "react";
import { useState } from "react";
import { useField, useFormikContext } from "formik";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ImageUploadButton = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Validate file type (allow only images)
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      setFieldValue(name, file); // Set Formik field value
    } else {
      setSelectedFile(null);
      setFieldValue(name, null); // Clear the field value if an invalid file is selected
      alert("Please select a valid image file.");
    }
  };

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        {...otherProps}
      >
        {selectedFile ? selectedFile.name : "Upload image"}
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          name={field.name}
        />
      </Button>
    </div>
  );
};

export default ImageUploadButton;
