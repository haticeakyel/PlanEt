import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { registerUser } from '../api/userApi';
import MuiPhoneNumber from 'material-ui-phone-number';


const style = {

  field: {
    paddingBottom: "10px",
  },
  first: {
    paddingBottom: "10px",
    marginTop: "40px"
  }
}

function SignUp() {

  const [showPassword, setShowPassword] = React.useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [confPassword, setConfPassword] = useState("");
  

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const userRegister = async () => {
    const data = {
      name: name,
      surname: surname,
      email: email,
      phoneNumber: phoneNumber,
      password: password

    }
    try {
      await registerUser(data)
    } catch (error) {
      console.log(error, "error error")
    }
  }

  return (
    <Container style={{ maxWidth: "400px" }}>
      <div style={{ display: "grid" }}>
        <TextField
          style={style.first}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          style={style.field}
          id="outlined-basic"
          label="Surname" variant="outlined"
          value={surname}
          onChange={e => setSurname(e.target.value)} />
        <form style={{ display: "grid" }}>

          <TextField style={style.field}
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            label="Email" />

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
                    onChange={e => setPassword(e.target.value)}
                    value={password}
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
          <Button variant="contained" type='submit' onClick={userRegister}> Submit </Button>

        </form>

      </div>
    </Container>
  );
}

export default SignUp;