import * as React from "react";
import { Formik, Form, useField } from "formik";
import {
  Grid,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = ({
  field,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  label,
  error, // Prop to indicate if there's an error
}) => (
  <FormControl variant="outlined" fullWidth error={error}>
    <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
    <OutlinedInput
      {...field}
      id="outlined-adornment-password"
      label={label}
      type={showPassword ? "text" : "password"}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>
);

// ... (imports remain unchanged)

const PasswordForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = (field) => () => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [passwordField, passwordMeta] = useField("password");
  const [confirmField, confirmMeta] = useField("confirmPassword");

  // Error logic updated to display error only when passwords don't match
  const passwordMismatchError =
    confirmField.value && passwordField.value !== confirmField.value
      ? "Passwords do not match"
      : null;

  return (
    <div>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          // Handle form submission here
          console.log(values);
        }}
      >
        <Form>
          <Grid container spacing={1.2} >
            <Grid item xs={12} sm={6} style={{color:'red'}}>
              <PasswordField
                field={passwordField}
                label="Password"
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword("password")}
                handleMouseDownPassword={handleMouseDownPassword}
                error={
                  passwordMeta.touched &&
                  (!!passwordMeta.error || !!passwordMismatchError)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{borderColor:'red'}}>
              <PasswordField
                field={confirmField}
                label="Confirm Password"
                showPassword={showConfirmPassword}
                handleClickShowPassword={handleClickShowPassword(
                  "confirmPassword"
                )}
                handleMouseDownPassword={handleMouseDownPassword}
                error={
                  confirmMeta.touched &&
                  (!!confirmMeta.error || !!passwordMismatchError)
                }
              />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </div>
  );
};

export default PasswordForm;
