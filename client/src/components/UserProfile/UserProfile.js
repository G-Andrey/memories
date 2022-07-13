import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Typography, Paper, Box, Divider, } from '@material-ui/core';
import useStyles from './styles.js';
import { useDispatch, useSelector } from 'react-redux';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import PhotoIcon from '@material-ui/icons/Photo';
import CommentIcon from '@material-ui/icons/Comment';
import { getUserPosts } from '../../actions/posts.js';
import * as api from '../../api';

import Form from '../Form/Form.js';
import Posts from '../Posts/Posts.js';


const UserProfile = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [postCount, setpostCount] = useState(0);
  const [likeCount, setlikeCount] = useState(0);
  const [commentsCount, setcommentsCount] = useState(0);

  useEffect(() => {
    dispatch(getUserPosts())

    const fetchUserData = async () => {
      const { data } = await api.getUserPosts();
     
      console.log(data);
      setpostCount(data.length);

      let likes = 0;
      let comments = 0;

      data.forEach(element => {
        likes = likes + element.likes.length;
        comments = comments + element.comments.length;
      });
      setlikeCount(likes);
      setcommentsCount(comments);
    }

    fetchUserData() 
  }, [])

  return (
    <div>
      <Paper elevation={6} style={{ padding: '10px',marginBottom: "20px", borderRadius:'4px', marginLeft: '24px', marginRight: '24px'}}>
        <Typography variant='h6' align="center" style={{ color: 'rgb(95, 116, 141)', marginBottom:'10px' }}>
          Overview
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" maxWidth='500px' margin="auto">
            <Box display="flex" justifyContent="center" alignItems="center">
              <PhotoIcon style={{ color: 'rgb(36, 153, 239)',fontSize: '50px', margin:"5px" }}/>
              <Box>
                <Typography variant="h6" style={{fontSize: '14px',fontWeight: '600', color: 'rgb(95, 116, 141)'}}>
                  Memories
                </Typography>
                <Typography variant="h6" style={{fontSize: '18px',fontWeight: '600', color:'rgb(36, 153, 239)'}}>
                  {postCount}
                </Typography>
              </Box>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box display="flex" justifyContent="center" alignItems="center">
              <ThumbUpAltIcon style={{ color: 'rgb(140, 141, 255)',fontSize: '50px', margin:"5px" }}/>
              <Box>
                <Typography variant="h6" style={{fontSize: '14px',fontWeight: '600', color: 'rgb(95, 116, 141)'}}>
                  Likes
                </Typography>
                <Typography variant="h6" style={{fontSize: '18px',fontWeight: '600', color:'rgb(140, 141, 255)'}}>
                  {likeCount}
                </Typography>
              </Box>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box display="flex" justifyContent="center" alignItems="center">
              <CommentIcon style={{ color: 'rgb(140, 163, 186)',fontSize: '50px', margin:"5px" }}/>
              <Box>
                <Typography variant="h6" style={{fontSize: '14px',fontWeight: '600', color: 'rgb(95, 116, 141)'}}>
                  Comments
                </Typography>
                <Typography variant="h6" style={{fontSize: '18px',fontWeight: '600', color:'rgb(140, 163, 186)'}}>
                  {commentsCount}
                </Typography>
              </Box>
            </Box>
        </Box>
      </Paper>
      <Grow in >
        <Container maxWidth="xl">
          <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Paper>
                <Typography variant='h6' align="center" style={{ marginBottom:'20px', padding:'10px' }}>
                  Your Memories
                </Typography>
              </Paper>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  )
}

export default UserProfile;
