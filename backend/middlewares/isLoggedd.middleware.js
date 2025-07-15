import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookie from 'cookie-parser';

dotenv.config();
export const isLogged = async (req, res, next) => {
  try {
    // Check if the request has a cookie with the access token

    const token = req.cookies?.accessToken;
    // If no token is found, return a 401 Unauthorized response
    if (!token) {
      return res.status(401).json({
        status: 'failed',
        message: 'failed to get credentials',
      });
    }
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    // Attach the decoded user information to the request object
    req.user = decoded;
    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If an error occurs during token verification, return a 500 Internal Server Error response
    return res.status(500).json({
      status: 'failed',
      message: 'Server(auth middleware) Internal Problem',
      error: error.message,
    });
  }
};
