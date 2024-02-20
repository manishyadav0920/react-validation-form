import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';


const Gender = () => {
  return (
    <Formik
      initialValues={{
        gender: '',
      }}
      onSubmit={(values) => {
        // Handle form submission
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="gender">
            {({ field, meta }) => (
              <RadioGroup
                {...field}
                row
                aria-label="gender"
                error={meta.touched && meta.error}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            )}
          </Field>
          {touched.gender && errors.gender && (
            <div style={{ color: 'red' }}>{errors.gender}</div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Gender;
