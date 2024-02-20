import React from "react";
import Header from "./Components/Header";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Container, Grid, Typography } from "@mui/material";
import Textfield from "./Components/FormsUI/Textfield";
import Select from "./Components/FormsUI/Select";
import DateTimePicker from "./Components/FormsUI/DataTimePicker";
import Checkbox from "./Components/FormsUI/Checkbox";
import Button from "./Components/FormsUI/Button";
import countries from "./data/countries.json";
import UrlLink from "./Components/FormsUI/Url";
import FileUploadButton from "./Components/FormsUI/FileUpload";
import ImageUploadButton from "./Components/FormsUI/ImageUpload";
import PasswordForm from "./Components/FormsUI/Password";
import Captcha from "./Components/FormsUI/Captcha";
import PhoneNumber from "./Components/FormsUI/Phone";
import MultipleCheckboxes from "./Components/FormsUI/MultipleCheckbox";
import Gender from "./Components/FormsUI/Gender";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
// import { Box } from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//   formWrapper: {
//     marginTop: theme.spacing(5),
//     marginBottom: theme.spacing(8),
//   },
// }));

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  email: "",
  password: "",
  confirmPassword: "",
  url: "",
  fileupload: "",
  imageupload: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  movie: "",
  captcha: "",
  phone: "",
  departureDate: "",
  termsOfService: false,
};

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  dob: Yup.date().required("Required"),
  email: Yup.string().email("Invalid email.").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  url: Yup.string().url("Invalid URL format").required("Required"),
  movie: Yup.array().min(1, "Select at least one option").required("Required"),
  imageupload: Yup.mixed()
    .test("fileType", "Invalid file type", (value) => {
      if (!value) {
        return true; // Return true if no file is uploaded (allow null or undefined)
      }
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      return allowedTypes.includes(value.type);
    })
    .nullable() // Allow null value for initial state
    .required("Image is required"), // Require an image to be uploaded
  fileupload: Yup.mixed()
    .test("fileType", "Invalid file type", (value) => {
      if (value) {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        return allowedTypes.includes(value.type);
      }
      return true; // If no file is uploaded, return true to indicate no error
    })
    .required("File is required")
    .nullable(), // Allow null value for initial state
  addressLine1: Yup.string().required("Required"),
  addressLine2: Yup.string(),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  captcha: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  arrivealDate: Yup.date().required("Required"),
  departureDate: Yup.date().required("Required"),
  termsOfService: Yup.boolean()
    .oneOf([true], "The terms and conditions must be accepted.")
    .required("The terms and conditions must be accepted."),
});

const App = () => {
  // const classes = useStyles();
  const [darkMode, setDarkMode] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header check={darkMode} change={() => setDarkMode(!darkMode)} />

      <Grid container sx={{ marginTop: "40px", marginBottom: "60px" }}>
        {/* <Grid item xs={12}>
        <Header />
      </Grid> */}
        <Grid item xs={12}>
          <Container maxWidth="md">
            <div>
              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE,
                }}
                validationSchema={FORM_VALIDATION}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>Your details</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Textfield name="firstName" label="First Name" />
                    </Grid>

                    <Grid item xs={6}>
                      <Textfield name="lastName" label="Last Name" />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography>Gender</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Gender name="gender" />
                    </Grid>

                    <Grid item xs={6}>
                      <DateTimePicker name="dob" label="DOB" />
                    </Grid>

                    <Grid item xs={6}>
                      <Textfield name="email" label="Email" />
                    </Grid>

                    <Grid item xs={6}>
                      <PasswordForm name="password" label="Password" />
                    </Grid>

                    <Grid item xs={12}>
                      <UrlLink name="url" label="Url" />
                    </Grid>
                    <Grid item xs={12}>
                      <MultipleCheckboxes name="movie" label="Select Movie" />
                    </Grid>

                    <Grid item xs={6}>
                      <Typography>Upload Image</Typography>
                      <ImageUploadButton
                        name="imageupload"
                        label="Image Upload"
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Typography>Upload File</Typography>
                      <FileUploadButton name="fileupload" label="File Upload" />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography>Address</Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Textfield name="addressLine1" label="Address Line 1" />
                    </Grid>

                    <Grid item xs={12}>
                      <Textfield name="addressLine2" label="Address Line 2" />
                    </Grid>

                    <Grid item xs={6}>
                      <Textfield name="city" label="City" />
                    </Grid>

                    <Grid item xs={6}>
                      <Textfield name="state" label="State" />
                    </Grid>

                    <Grid item xs={12}>
                      <Select
                        name="country"
                        label="Country"
                        options={countries}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography>Validate Captcha</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Captcha name="captcha" />
                    </Grid>

                    <Grid item xs={6}>
                      <PhoneNumber name="phone" label="Phone Number" />
                    </Grid>

                    {/* <Grid item xs={12}>
                    <Textfield
                      name="message"
                      label="Message"
                      multiline={true}
                      rows={4}
                    />
                  </Grid> */}

                    <Grid item xs={12}>
                      <Checkbox
                        name="termsOfService"
                        legend="I have read and agreed to the Terms and Conditions"
                        // label="I agree"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button style={{ background: "red" }}>Submit Form</Button>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </div>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
