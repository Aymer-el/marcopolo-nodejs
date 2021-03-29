import Gamer from '../schemas/gamer.schema.js'

export const CheckDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  Gamer.findOne({
    username: req.body.username
  }).exec((err, gamer) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (gamer) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    Gamer.findOne({
      email: req.body.email
    }).exec((err, gamer) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (gamer) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};
