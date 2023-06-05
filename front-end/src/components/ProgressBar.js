import Header from './Header';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, withStyles } from '@material-ui/core';
import { fetchEvents } from '../actions/eventAction';
import planets from '../assets/planets.png';

const styles = (theme) => ({
  root: {
    maxWidth: '80%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    strokeLinecap: 'round',
  },
  text1: {
    fontSize: '20px',
    fontWeight: 'bold',
    fill: theme.palette.text.primary,
    position: 'absolute',
    top: '55%',
    left:'15%',
    transform: 'translate(-50%, -50%)',
  },
  text2: {
    fontSize: '20px',
    fontWeight: 'bold',
    fill: theme.palette.text.primary,
    position: 'absolute',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  text3: {
    fontSize: '20px',
    fontWeight: 'bold',
    fill: theme.palette.text.primary,
    position: 'absolute',
    top: '55%',
    left: '85%',
    transform: 'translate(-50%, -50%)',
  },
  img: {
    position: 'fixed',
    top: 0,
    left: 0,
    minWidth: '100%',
    minHeight: '100%',
    zIndex: -1,
    background: '#110313',
    mixBlendMode: 'overlay',
    opacity: 0.4,
  },
});

function ProgressBar(props) {
  const { fetchEvents, events, classes, userId } = props;
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
    fetchEvents(userId);
  }, [userId]);

  const calculateProgress = () => {
    if (!events || !events.events || events.events.length === 0) {
      return 0;
    }

    const completedEvents = events.events.filter((event) => event.status === true);
    const progress = (completedEvents.length / events.events.length) * 100;
    return progress;
  };

  const calculateProgressLastSevenDays = () => {
    if (!events || !events.events || events.events.length === 0) {
      return 0;
    }

    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const completedEvents = events.events.filter(
      (event) => event.status === true && new Date(event.endDate) >= sevenDaysAgo
    );
    const progress = (completedEvents.length / events.events.length) * 100;
    return progress;
  };

  const calculateProgressToday = () => {
    if (!events || !events.events || events.events.length === 0) {
      return 0;
    }

    const currentDate = new Date();

    const completedEvents = events.events.filter(
      (event) =>
        event.status === true &&
        new Date(event.endDate).toLocaleDateString() === currentDate.toLocaleDateString()
    );
    const progress = (completedEvents.length / events.events.length) * 100;
    return progress;
  };

  return (
    <>
      <img src={planets} className={classes.img} />
      <div className="App" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <h1>Your Progress</h1>
        <div className={classes.root}>
          <div>
            <h3>All Events Progress</h3>
            <CircularProgress variant="static" value={calculateProgress()} size={200} thickness={5} />
            <text className={classes.text1} >
              {`${Math.round(calculateProgress())}%`}
            </text>
          </div>
          <div>
            <h3>Last Seven Days Progress</h3>
            <CircularProgress
              variant="static"
              value={calculateProgressLastSevenDays()}
              size={200}
              thickness={5}
            />
            <text className={classes.text2}>
              {`${Math.round(calculateProgressLastSevenDays())}%`}
            </text>
          </div>
          <div >
            <h3 style={{paddingLeft:"40%"}}>Today's Progress</h3>
            <CircularProgress variant="static" value={calculateProgressToday()} size={200} thickness={5} />
            <text className={classes.text3}>
              {`${Math.round(calculateProgressToday())}%`}
            </text>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  events: state.events,
  userId: state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: (userId) => {
    dispatch(fetchEvents(userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProgressBar));
