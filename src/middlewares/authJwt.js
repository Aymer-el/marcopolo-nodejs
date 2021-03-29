import jwt from 'jsonwebtoken'
import Gamer from '../schemas/gamer.schema.js'

export const VerifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  //@WARNING: to change
  jwt.verify(token, 'thisisasecret', (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

export const IsGamer = (req, res, next) => {
  Gamer.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    next();
    return;
  });
};