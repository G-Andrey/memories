import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core';
import memories from '../../images/memories.png';
import useStyles from './styles.js';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt from 'jwt-decode';

const Navbar = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch( { type: 'LOGOUT' });
    history.push('/');
    setUser(null);
    props.updateUser();
  };

  useEffect(() => {
    const token = user?.token;

    //Handle logging user out if current jwt token is expired
    if (token){
      const decodedToken = jwt(token);

      if (decodedToken.exp * 1000 < new Date().getTime()){
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return(
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="app-logo" height="60"/>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography component={Link} to="/profile" className={classes.userName} variant='h6'>
              {user.result.name}
            </Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button variant='contained' component={Link} to="/auth" color='primary'>
            Sign In
          </Button>
        )
        }
      </Toolbar> 
    </AppBar>
  );
};

export default Navbar;