import React, {useEffect} from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts.js';
import CommentSection from './CommentSection.jsx';

import useStyles from './styles.js';

const PostDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id,history))
  }, [id,dispatch])

  useEffect(() => {
    if (post){
      dispatch(getPostsBySearch( {searchQuery: 'none', tags: post?.tags.join(',')} ));
    }
  }, [post,dispatch])

  if(isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper} >
        <CircularProgress size="4em"/> 
        <Typography variant="h6">
          &nbsp; &nbsp; &nbsp; Loading post...
        </Typography>
      </Paper>
    )
  };

  const openPost = (_id) => {
    history.push( `/posts/${_id}`);
  };

  const recommendedPosts = posts?.filter(({ _id }) => _id !== post?._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post?.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post?.message}</Typography>
          <Typography variant="h6">Created by: {post?.name}</Typography>
          <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post}/>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt="memory" />
        </div>
      </div>
      {recommendedPosts.length === 0 && (
        <div>
          <Typography variant="h6">
            No recommendations found
          </Typography>
        </div>
      )}
      {recommendedPosts.length > 0 && (
        <div className={classes.section}>
          <Typography gutterBottom varaint="h5" >
            You might also like:
          </Typography>
          <Divider/>
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map( ({ title, message, name, likes, selectedFile, _id }) => (
              <div className={classes.recommendedPostCard} onClick={() => openPost(_id)} key={_id} >
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" alt="recommended memory"/>
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;