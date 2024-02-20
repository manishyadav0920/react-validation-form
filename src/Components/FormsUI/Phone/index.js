import React from "react";
import { Grid, FormControl } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const PhoneNumber = () => {
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: Yup.object().shape({
      phoneNumber: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} style={{ height: "55px" }}>
        <FormControl
          fullWidth
          error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
        >
          <PhoneInput
            country={"in"}
            value={formik.values.phoneNumber}
            onChange={(phone) => formik.setFieldValue("phoneNumber", phone)}
            onBlur={formik.handleBlur("phoneNumber")}
            inputStyle={{
              width: "216%",
              borderColor:
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? "red"
                  : "", 
            }}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <p
              className="error"
              style={{
                color: "#f44336",
                marginTop: "4px",
                fontSize: "12px",
                marginLeft: "10px",
              }}
            >
              {formik.errors.phoneNumber}
            </p>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default PhoneNumber;
