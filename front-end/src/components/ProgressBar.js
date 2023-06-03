import Header from './Header';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../actions/userAction';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button, Dialog, DialogTitle, DialogContent, CircularProgress, withStyles } from '@material-ui/core';
import { pink } from '@mui/material/colors';
import { fetchEvents } from '../actions/eventAction';
import planets from '../assets/planets.png'

const styles = (theme) => ({
  root: {
    width: '400px',
    height: '400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    strokeLinecap: 'round',
  },
  text: {
    fontSize: '20px',
    fontWeight: 'bold',
    fill: theme.palette.text.primary,
    position: 'absolute',
  },
  img: {
    position: "fixed",
    top: 0,
    left: 0,
    minWidth: "100%",
    minHeight: "100%",
    zIndex: -1,
    background: "#110313",
    mixBlendMode: "overlay",
    opacity:0.4
  }
});

function ProgressBar(props) {
  const { fetchEvents, events, classes } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const hasCookie = document.cookie.includes('user_token');
    if (!hasCookie) {
      navigate('/login');
    } else {
      
    }
  }, [navigate]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const calculateProgress = () => {
    if (!events || !events.events || events.events.length === 0) {
      return 0;
    }

    const completedEvents = events.events.filter(event => event.status === true);
    const progress = (completedEvents.length / events.events.length) * 100;
    return progress;
  };

  return (
    <>
    <img src={planets} className={classes.img} /> 
      <div className="App" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <h1>Your Progress </h1>
        <div className={classes.root}>
          <CircularProgress variant="static" value={calculateProgress()} size={200} thickness={5} />
          <text x="50%" y="50%" className={classes.text}>{`${Math.round(calculateProgress())}%`}</text>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  events: state.events
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => {
    dispatch(fetchEvents());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProgressBar));
