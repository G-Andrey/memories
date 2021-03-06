import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const auth = async(req, res, next) => {
  try {
    //check if user is who they claim to be using jwt

    //retrieve token from request header
    const token = req.headers.authorization.split(" ")[1];

    //check if token is custom or google's. if len(token) < 500 it is custom(generated by our backend). True if custom, False if google's
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth){
      //decode token with our custom jwt secret that was used when creating user
      decodedData = jwt.decode(token, process.env.JWT_SECRET);

      req.userId = decodedData?.id;
    } else{
      //decode token with google
      decodedData = jwt.decode(token);
      
      req.userId = decodedData?.sub;
    }
    
    next() 
  } catch (error) {
    console.log(error);
  }
}

export default auth; 