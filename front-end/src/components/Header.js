import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PublicIcon from '@mui/icons-material/Public';
import { logOutUser } from '../api/userApi';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authUser } from '../actions/userAction';
import {  deepPurple } from '@mui/material/colors';

const pages = ['Calendar', 'Progress Bar'];
const settings = ['Profile','Logout'];

function Header(props) {
  const {user} = props
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = async () =>{
    try {
      await logOutUser()
      window.location = window.location.origin + "/login";
    } catch (error) {
      console.log("çıkamadın", error)
    }
    
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4a148c' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PublicIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PlanEt
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            <MenuItem onClick={handleCloseUserMenu} component={Link} to="/main">
            <Typography textAlign="center">Calendar</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu} component={Link} to="/progressBar">
          <Typography textAlign="center">Progress Bar</Typography>
        </MenuItem>
            </Menu>
          </Box>
          <PublicIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PlanEt
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button
                component={Link}
                to="/main"
                sx={{ my: 2, color: 'white', display: 'block' }}
                
              >
               Calendar
              </Button>
              <Button
              component={Link}
                to="/progressBar"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
             Progress Bar
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: deepPurple[500]}}>
              {user && user.name && user.surName && `${user.name.charAt(0)}${user.surName.charAt(0)}`}
            </Avatar>            
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu} component={Link} to="/profile">
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              <MenuItem onClick={logOut}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
