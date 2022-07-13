import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Paper, Typography } from '@material-ui/core';

import Post from './Post/Post.js';
import useStyles from './styles.js';

const Posts = ( {setCurrentId} ) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector( (state) => state.posts);

  if (!posts.length && !isLoading) return 'NO POSTS';

  return (
    isLoading ? (
      <Paper elevation={6} className={classes.loadingPaper} >
        <CircularProgress size="4em"/> 
        <Typography variant="h6">
          &nbsp; &nbsp; &nbsp; Loading all posts...
        </Typography>
      </Paper>) 
    : (
      <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts;