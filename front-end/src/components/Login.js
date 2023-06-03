import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, createTheme } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useEffect, useState } from 'react';
import { loginUser } from '../api/userApi';
import { authUser } from '../actions/userAction';
import { connect } from "react-redux";
import video from '../assets/video.mp4';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import planet from '../assets/planet.png';
import { deepPurple } from '@mui/material/colors';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  palette: {
    primary: deepPurple,
  },
});

const useStyles = makeStyles((theme) => ({
  video: {
    position: "fixed",
    top: 0,
    left: 0,
    minWidth: "100%",
    minHeight: "100%",
    zIndex: -1,
    background: "#110313",
    mixBlendMode: "overlay",
  },
  centeredImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "40px",
    paddingBottom: "20px",
  },
  container:{
    
  }
}));



function Login(props) {
  const { authUser } = props;
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const userLogin = async () => {
    const user = {
      email: email,
      password: password,
    };
    try {
      await loginUser(user);
      setTimeout(() => {
        window.location = window.location.origin + "/";
      }, 500);
    } catch (error) {
      console.log(error, "error error");
    }
  };

  useEffect(() => {
    authUser();
  }, []);

  const checkUserSession = () => {
    const loggedInUser = document.cookie.includes("user_token");

    if (loggedInUser) {
      window.location = window.location.origin + "/";
    } else {
    }
  };
  checkUserSession();

  return (
    <ThemeProvider theme={theme}>
    <>
      <video className={classes.video} autoPlay muted loop id="background-video">
        <source src={video} type="video/mp4" />
      </video> 
      <div className={classes.centeredImage}>
      <img src={planet} style={{ width: "20%" }} alt="Planet" />
    </div>
      <Container style={{ maxWidth: "500px", border: '1px solid black', borderRadius: '4px',backgroundColor:"white", minHeight:"250px" }}>
        <div style={{ display: "grid" }}>
          <FormControl>
        <TextField
            style={{ paddingBottom: "10px", marginTop: "40px" }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </FormControl>
          <FormControl style={{ paddingBottom: "10px" }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
            >
              Password
            </InputLabel>
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

          <Button variant="contained" onClick={userLogin}>
            Sign In
          </Button>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop:"10px", color:"black", fontSize:"22px" }}>
          <Link to="/register" style={{ textDecoration: 'none' }}>
          Don't have an account? Register
          </Link>
        </div>
        </div>
      </Container>
    </>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  authUser: () => {
    dispatch(authUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
