import Header from './Header';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../actions/userAction';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, CircularProgress, withStyles } from '@material-ui/core';
import {  pink } from '@mui/material/colors';

function Profile(props) {
  const {
    authUser,
    user
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState('');
  const [open, setOpen] = useState(false);

  const fetchQuote = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://type.fit/api/quotes');
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex].text;
      setQuote(randomQuote);
      setIsLoading(false);
      setOpen(true);
    } catch (error) {
      console.log('Error fetching quote:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SquareDialog = withStyles({
    paper: {
      borderRadius: 0,
    },
  })(Dialog);

  const navigate = useNavigate();
  useEffect(() => {
    const hasCookie = document.cookie.includes('user_token');
    if (!hasCookie) {
      navigate('/login');
    }
    else{
      
    }
  }, [navigate]);

  useEffect(() => {
    authUser();
  }, []);

  return (
    <>
    <div className="App" style={{ justifyContent: "center", display: "flex", flexDirection: "column"}}>
    <Header />
    <h1>Your Profile</h1>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', border: '1px solid black', borderRadius: '4px' }}>
        {[
          { label: "Name", value: user.name },
          { label: "Surname", value: user.surName },
          { label: "Email", value: user.email },
          { label: "Phone Number", value: user.phoneNumber },
          { label: "Birth Day", value: user.birthDate ? new Date(user.birthDate).toLocaleDateString('en-GB') : "" },
        ].map((item) => (
          <ListItem key={item.label}>
            <ListItemText primary={`${item.label}: ${item.value}`} />
          </ListItem>
        ))}
      </List>
    </div>
    <Button style={{color: pink[500]}} onClick={fetchQuote}>Shuffle an Inspiring Sentence!</Button>
    <SquareDialog open={open} onClose={handleClose}>
        <DialogTitle style={{ color: '#1a237e' }}>Today's Quote</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isLoading ? <CircularProgress /> : quote}
          </DialogContentText>
        </DialogContent>
      </SquareDialog>
  </div>
  
     
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  authUser: () => {
    dispatch(authUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
