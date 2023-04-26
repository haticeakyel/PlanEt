import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const style = {
  field: {
    paddingBottom: "10px",
  },
  first:{
    paddingBottom: "10px",
    marginTop: "40px"
  }
}

function SignIn(){


    const [showPassword, setShowPassword] = React.useState(true);

    const handleClickShowPassword = () => setShowPassword((show) => !show);


    return(


      <Container style={{maxWidth:"400px"}}/* className={classes.first}  style={{backgroundImage: `URL(${image})`, backgroundSize: "cover", backgroundRepeat:"no-repeat"}} */>

        <div style={{display: "grid", }}>
        <TextField style={style.first} id="outlined-basic" label="Email" variant="outlined" />
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




        <Button /* className={classes.addButton} */ variant="contained">Sign In</Button>
      </div>
      </Container>
    );
}

export default SignIn;