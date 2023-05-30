import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useEffect, useState } from 'react';
import { loginUser } from '../api/userApi';
import { authUser } from '../actions/userAction';
import { connect } from "react-redux";

const style = {
  field: {
    paddingBottom: "10px",
  },
  first:{
    paddingBottom: "10px",
    marginTop: "40px"
  }
}

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};
function Login(props) {

  const {
    authUser
  } = props;

    const [showPassword, setShowPassword] = React.useState(true);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const userLogin = async () => {
      const user = {
        email: email,
        password: password
      }
      try {
        await loginUser(user)
        setTimeout(() => {
          window.location = window.location.origin + "/";
        }, 500);
      } catch (error) {
        console.log(error, "error error")
      }
    }
    

    useEffect(() => {
      authUser()
    }, [])
    
    const checkUserSession = () => {
      const loggedInUser = document.cookie.includes("user_token");
    
      if (loggedInUser) {
        window.location = window.location.origin + "/";
      } else {
      }
    };
    checkUserSession();
  return (
   
    <Container style={{maxWidth:"400px"}}/* className={classes.first}  style={{backgroundImage: `URL(${image})`, backgroundSize: "cover", backgroundRepeat:"no-repeat"}} */>

    <div style={{display: "grid", }}>
    <TextField style={style.first} id="outlined-basic" label="Email" variant="outlined" 
    value={email} onChange={e => setEmail(e.target.value)} />
    <FormControl style={style.field} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password" value={password} onChange={e=> setPassword(e.target.value)} >Password</InputLabel>
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

    <Button /* className={classes.addButton} */ variant="contained" onClick={userLogin}>Sign In</Button>
  </div>
  </Container>
  );
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  authUser: () => {
    dispatch(authUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
