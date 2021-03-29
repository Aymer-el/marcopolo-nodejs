import express from 'express';
import { StoryController } from './controllers/story.controller.js';
import { GetFriendsList, GetFriendRequests, GetFriendSuggestions, SearchForPeople, Signin, Signup, RespondToFriendRequest, SendFriendRequest } from './controllers/gamer.controller.js';
import { CheckDuplicateUsernameOrEmail } from './middlewares/verifySignUp.js';
import { VerifyToken } from './middlewares/authJwt.js';
import { body, check, param, query } from 'express-validator';

const router = express.Router();

router.get("/gamer/search-for-people",
[
  VerifyToken,
  query('gamer_id').exists().isLength({ min: 24, max: 24 }).withMessage('Enter a correct value for gamer_id'),
  query('match').exists().isLength({min: 3, max: 36}).withMessage('Enter a correct value for the search')
], SearchForPeople);

router.get("/gamer/get-friends-list", [
  VerifyToken,
  query('gamer_id').exists().isLength({ min: 24, max: 24 }).withMessage('Enter a correct value for gamer_id')
], GetFriendsList);

router.get("/gamer/get-friend-requests", [
  VerifyToken,
  query('gamer_id').exists().isLength({ min: 24, max: 24 }).withMessage('Enter a correct value for gamer_id')
], GetFriendRequests);

router.get("/gamer/get-friend-suggestions", [
  VerifyToken,
  query('gamer_id').exists().isLength({ min: 24, max: 24 }).withMessage('Enter a correct value for gamer_id')
], GetFriendSuggestions);

router.post("/gamer/send-friend-request", [VerifyToken], SendFriendRequest);

router.post("/gamer/respond-to-friend-request", [VerifyToken], RespondToFriendRequest);

router.post("/gamer/sign-up", [
  body('email').exists().isEmail().withMessage('Enter a valid e-mail'),
  body('username').exists().isLength({min: 3, max: 36}).withMessage('Enter a correct username'),
  body('password').exists().isLength({min: 8, max: 20}).withMessage('Enter a correct password'),
  CheckDuplicateUsernameOrEmail,
], Signup);

router.post("/gamer/sign-in", [
  body('username').exists().isLength({min: 3, max: 36}).withMessage('Enter a correct username'),
  // @Todo : To change to min 8 later on
  body('password').exists().isLength({min: 3, max: 20}).withMessage('Login details are not valid!!')
], Signin);

export default router