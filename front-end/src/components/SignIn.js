import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import image from '../assets/planet.jpeg';
/* import { withStyles } from '@mui/material/styles'; */


/* const useStyles = withStyles((theme) => ({
  addButton: {
    marginBottom: "15px",
    marginTop: "15px",
    position: "relative",
    width: "125px",
    marginLeft: "80%",
    
  },
}));
 */
function SignIn(){

  /* const classes = useStyles(); */

    const [showPassword, setShowPassword] = React.useState(true);

    const handleClickShowPassword = () => setShowPassword((show) => !show);


    return(


      <Container style={{maxWidth:"400px"}}/* className={classes.first}  style={{backgroundImage: `URL(${image})`, backgroundSize: "cover", backgroundRepeat:"no-repeat"}} */>

        <div style={{display: "grid", }}>
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <FormControl variant="outlined">
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
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