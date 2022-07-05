//logic for all the routes in /posts

import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';


export const getPosts = async (req,res) => {
  const { page } = req.query;

  try{
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; //starting index of page
    const total = await PostMessage.countDocuments({})

    const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);

    res.status(200).json( {data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)} );
  } catch(error) {
    res.status(404).json({ message: error.message });
  }
}

export const getPost = async (req,res) => {
  const { id } = req.params;
  try{
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch(error) {
    res.status(404).json({ message: error.message });
  }
}

//post requests have access to request body
export const createPost = async (req,res) => {
  const post = req.body;

  const newPostMessage = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString() });

  try{  
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch(error) {
    res.status(409).json({ message: error.message });
  }
}

export const updatePost = async (req,res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

  const postToUpdate = await PostMessage.findById(_id);

  if (req.userId !== postToUpdate.creator) return res.status(401).send(`Unauthorized to edit post`);

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true})

  res.json(updatedPost)
}

export const deletePost = async(req, res) => {
  //id of post to be deleted
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const postToDelete = await PostMessage.findById(id);

  if (req.userId !== postToDelete.creator) return res.status(401).send(`Unauthorized to delete post`);

  await PostMessage.findByIdAndDelete(id);

  res.json( {message: 'Post deleted successfully'} );
}

export const likePost = async(req,res) => {
  const { id } = req.params;

  //req.userId was populated by the middleware so we can access it here
  if (!req.userId) return res.json({message: 'Unauthenticated. Cannot like post.'});

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  //Check if the post.likes array already contains the userid of the current req
  const index = post.likes.findIndex( (id) => id === String(req.userId));

  if(index === -1){
    //current id not in likes => add it to likes array
    post.likes.push(req.userId);
  } else {
    //current id already liked post => unlike the post, remove id from likes array
    post.likes = post.likes.filter( (id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

  res.json(updatedPost)
}

export const getPostsBySearch = async(req,res) => {
  const { searchQuery, tags } = req.query

   try {
    //retrieve post request query info
    const title = new RegExp(searchQuery, 'i');

    const posts = await PostMessage.find({ $or: [{title}, {tags: { $in: tags.split(',') }}] });

    res.json( {data: posts} );
   } catch (error) {
     res.status(404).json({ message: error.message})
   }
}

export const commentPost = async(req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id);

  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

  res.json(updatedPost);
}