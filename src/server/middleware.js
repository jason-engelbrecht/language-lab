import jwt from 'jsonwebtoken'
import secret from './secret';

const withAuth = (req, res, next) => {
  //get token from request
  const token = req.cookies.token;

  //no token
  if (!token) res.status(401).send('Unauthorized: No token provided');
  //has token, verify
  else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) res.status(401).send('Unauthorized: Invalid token');
      else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

module.exports = withAuth;
