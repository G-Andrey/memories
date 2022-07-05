import mongoose from 'mongoose';

//defines the template for a post object/tuple
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String, //image file converted to base64 string
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  comments: {
    type: [String],
    default: [],
  },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;