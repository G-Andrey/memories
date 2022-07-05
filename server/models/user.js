import mongoose from 'mongoose';

//defines the template for a user object/tuple
const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  name: {type: String}
});

export default mongoose.model('User', userSchema);;