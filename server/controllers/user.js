import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req,res) => {
  //retrieve name and email from body of post request
  const {email, password} = req.body;

  try{
    //find existing user in DB by email
    const existingUser = await User.findOne( {email} );

    //existing user was not found
    if (!existingUser) return res.status(404).json({message: `User with ${email} not found.`});

    //compare password from post req to password saved in DB
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    //passwords do not match
    if (!isPasswordCorrect) return res.status(400).json({message: `Invalid password.`});

    //user exists, and password is correct => generate jwt(data, secret(should be stored in env variable), options_object)
    const token = jwt.sign( {email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});

    //return user and token
    res.status(200).json({ result: existingUser, token})
  } catch (error){
    //unexpected error
    res.status(500).json({ message: `Something went wrong during sign in.`});
  }
}

export const signup = async (req,res) => {
  const {email, password, firstName, lastName, confirmPassword} = req.body;

  try{
    //get existing user if possible
    const existingUser = await User.findOne( {email} );

    //if user with email already exists => return status 400
    if (existingUser) return res.status(400).json({message: `User with ${email} already exists.`});

    //check if password and confirmPassword match
    if (password !== confirmPassword) return res.status(400).json({message: `Passwords do not match.`});

    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    //create user in DB
    const result = await User.create({email, password:hashedPassword, name: `${firstName} ${lastName}`});

    //generate jwt(data, secret(should be stored in env variable), options_object)
    const token = jwt.sign( {email: result.email, id: result._id}, 'test', {expiresIn: "1h"});

    //return user and token
    res.status(200).json({ result: result, token});
  } catch(error) {
    //unexpected error
    res.status(500).json({ message: `Something went wrong during sign up.`});
  }
}