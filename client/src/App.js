import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
import PostDetails from './components/PostDetails/PostDetails.jsx';
import UserProfile from './components/UserProfile/UserProfile.js';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const updateUser = () => {
    // console.log('Updating user');
    setUser(JSON.parse(localStorage.getItem('profile')));
  };

  return (
    <HashRouter>
      <Container maxWidth="xl">
        <Navbar updateUser={updateUser}/>
        <Switch>
          <Route path='/' exact component={() => <Redirect to='/posts'/>}/>
          <Route path='/posts' exact component={Home} />
          <Route path='/posts/search' exact component={Home} />
          <Route path='/posts/:id' component={PostDetails} />
          <Route path='/auth' exact component={() => (!user ? <Auth updateUser={updateUser} /> : <Redirect to='/posts'/>)}/>
          {user ? (
            <Route path='/profile' component={UserProfile} />
          ): 
            <Redirect to='/posts'/>
          }
        </Switch>
      </Container>
    </HashRouter>
    
  );
}

export default App;