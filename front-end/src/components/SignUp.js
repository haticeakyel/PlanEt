import { TextField, createTheme } from '@mui/material';
import React, { useState } from 'react';
import { Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { registerUser } from '../api/userApi';
import MuiPhoneNumber from 'material-ui-phone-number';
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
  }
}));

const style = {
  field: {
    paddingBottom: "10px",
  },
  first: {
    paddingBottom: "10px",
    marginTop: "40px"
  }
}

function SignUp({ onRegister }) {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatchError(e.target.value !== confPassword);
  };

  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
    setPasswordMatchError(e.target.value !== password);
  };

  const userRegister = async () => {
    if (password !== confPassword) {
      setPasswordMatchError(true);
      return;
    }

    const data = {
      name: name,
      surname: surname,
      email: email,
      phoneNumber: phoneNumber,
      password: password
    };

    try {
      await registerUser(data);
    } catch (error) {
      console.log(error, "error error");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <video className={classes.video} autoPlay muted loop id="background-video">
          <source src={video} type="video/mp4" />
        </video>
        <div className={classes.centeredImage}>
          <img src={planet} style={{ width: "20%" }} alt="Planet" />
        </div>
        <Container style={{ maxWidth: "500px", border: '1px solid black', borderRadius: '4px', backgroundColor: "white", minHeight: "450px" }}>
          <div style={{ display: "grid" }}>
            <TextField
              style={style.first}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              style={style.field}
              id="outlined-basic"
              label="Surname"
              variant="outlined"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <form style={{ display: "grid" }}>
              <TextField
                style={style.field}
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
              />

              <TextField
                style={style.field}
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
                InputProps={{
                  inputComponent: MuiPhoneNumber,
                  inputProps: {
                    locale: 'tr',
                    defaultCountry: 'tr',
                    format: '+## ### ### ## ##'
                  },
                }}
              />
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
                  error={passwordMatchError}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </FormControl>
              <FormControl className={classes.field} variant="outlined">
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
                  error={passwordMatchError}
                  value={confPassword}
                  onChange={handleConfPasswordChange}
                />
              </FormControl>
              <Button variant="contained" type='submit' style={{marginTop:"10px"}} onClick={userRegister}> Submit </Button>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: "10px", color: "black", fontSize: "22px" }}>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  Already have an account? Login
                </Link>
              </div>
            </form>
          </div>
        </Container>
      </>
    </ThemeProvider>
  );
}

export default SignUp;
