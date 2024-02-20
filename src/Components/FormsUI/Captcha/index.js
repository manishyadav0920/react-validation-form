import { CardActions, CardContent, TextField } from '@mui/material';
import React, { useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';

const Captcha = ({ name, label }) => {
  const randomString = Math.random().toString(36).slice(8);
  const [captcha, setCaptcha] = useState(randomString);
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);

  const refreshString = () => {
    const newCaptcha = Math.random().toString(36).slice(8);
    setCaptcha(newCaptcha);
    setText(''); // Clear the text field on refresh
    setError(false); // Reset error state on refresh
    setTouched(false); // Reset touched state on refresh
  };

  const handleChange = (event) => {
    const userInput = event.target.value;
    setText(userInput);
    setError(userInput !== captcha); // Set error if input doesn't match captcha
  };

  const handleBlur = () => {
    setTouched(true);
    if (!text.trim()) {
      setError(true); // Set error if the field is left empty on blur
    }
  };

  const configCaptcha = {
    variant: 'outlined',
  };

  return (
   
      <div className='card'>
        <CardContent style={{padding:"0px"}}>
          <TextField
            label={label || 'Enter Captcha'}
            {...configCaptcha}
            fullWidth
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(error || (touched && !text.trim()))}
            helperText={(error || (touched && !text.trim())) && 'Required'}
            type='captcha'
          />
           <CardActions>
            <div className='h3'>{captcha}</div>
            <RefreshIcon onClick={refreshString} style={{ cursor: 'pointer', color:'#0072e5'}} />
          </CardActions>
        </CardContent>
      </div>
  );
};

export default Captcha;