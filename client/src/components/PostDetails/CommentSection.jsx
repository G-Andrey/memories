import React, {useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import  { commentPost } from '../../actions/posts.js';

import useStyles from './styles.js';

const CommentSection = ( {post} ) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const commentsRef = useRef();
  
  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
    setComment('');
    commentsRef.current.scrollIntoView( {behavior: 'smooth'} );
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant='h6'>
            Comments
          </Typography>
          {comments?.length === 0 && (
            <strong>
              Be the first to comment
            </strong>
          )}
          {comments?.map((comment, index) =>(
            <Typography key={index} gutterBottom variant='subtitle1'>
              <strong>
                {comment.split(': ')[0]}: 
              </strong>
              {comment.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{width:"60%"}}>
            <Typography gutterBottom variant='h6' >
              Write a comment
            </Typography>
            <TextField fullWidth minRows={4} variant='outlined' label='Comment' multiline value={comment} onChange={(e) => setComment(e.target.value)}/>
            <Button style={{marginTop:"10px"}} fullWidth variant='contained' disabled={!comment} onClick={handleClick} color="primary" >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  )
};

export default CommentSection;
