import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
 

const style = {

  field: {
    paddingBottom: "10px",
  },
  first:{
    paddingBottom: "10px",
    marginTop: "20px"
  }
}

function SignUp(){

    const [showPassword, setShowPassword] = React.useState(true);

    const handleClickShowPassword = () => setShowPassword((show) => !show);


      const validate = (values) => {
        const errors = {}
      
        if (!values.email) {
          errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address'
        }
      
        return errors
      }

      const formik = useFormik({
        initialValues: {
          email: '',
        },
        validate,
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2))
        },
      })
    return(
      <Container style={{maxWidth:"400px"}}>
        <div style={{display: "grid"}}>
        <TextField style={style.first} id="outlined-basic" label="Name" variant="outlined" />
        <TextField style={style.field} id="outlined-basic" label="Surname" variant="outlined" />
        <form onSubmit={formik.handleSubmit} style={{display: "grid"}}>
          <TextField style={style.field} type="email" name="email" id="email" label="Email"
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
          {formik.touched.email && formik.errors.email && (
            <span>{formik.errors.email}</span>
          )}
          <FormControl style={style.field} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'password' : 'text'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          </FormControl>
          <FormControl style={style.field} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'password' : 'text'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          </FormControl>
          <Button variant="contained" type='submit'>Submit</Button>
       
      </form>

        </div>
        </Container>
    );
}

export default SignUp;