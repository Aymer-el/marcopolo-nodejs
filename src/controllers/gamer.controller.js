import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Gamer from '../schemas/gamer.schema.js'
import FriendRequest from '../schemas/friendRequests.schema.js'
import { validationResult } from 'express-validator'

export const GetFriendsList = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Retrieving gamer profil with its friends
    const gamer = await Gamer.findById(req.query.gamer_id)
    if(!gamer) {
        res.status(404).send({ message: 'gamer not found' });
        return;
    }
    // Retrieving friends' profil
    Gamer.find({ _id: {$in: gamer.friends} }, "-password", (err, friendsList) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(friendsList);
        return;
    }) 
}

export const SearchForPeople = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Searching for gamers with the match query
    Gamer.find({username: {'$regex': req.query.match, '$options': 'i'}}, "-password", 
    (err, gamers) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        // Onself found in the array of people searched
        const i = indexOfGamer2({_id: req.query.gamer_id}, gamers);
        if(i > -1) {
            gamers.splice(i, 1);
        }
        res.status(200).send({gamers});
    });
}

export const GetFriendSuggestions = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const gamer = await Gamer.findById(req.query.gamer_id);
    if(gamer) {
        if(gamer.friends && gamer.friends.length) {
            // Retrieving friends' profil
            const friends = await Gamer.find({ _id: {$in: gamer.friends} }, "-password") || [];
            
            // Getting all friends of friends in a flat array 
            let friendOfFriends = friends.map((friend) => friend.friends).flat();

            // removing doublons
            friendOfFriends = Array.from(new Set(friendOfFriends.map(friend => friend.toString())));

            // removing friends from the friends of friends
            gamer.friends.map((friend) => {
                const fofIndex = friendOfFriends.indexOf(friend._id.toString())
                if(fofIndex > -1) {
                    friendOfFriends.splice[1, fofIndex];
                }
            })

            // removing oneself from the array
            const selfFound = indexOfGamer(gamer, friendOfFriends)
            if(selfFound > -1) {
                friendOfFriends.splice(selfFound, 1);
            }

            // building profile of friends of friends
            Gamer.find({ _id: {$in: friendOfFriends} }, "-password", (err, friendSuggestions) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.status(200).send(friendSuggestions);
                return;
            })
        } else {
            res.status(200).send([])
            return;
        }
    } else {
        res.status(404).send({ message: 'user not found' });
        return;
    }
}

export const GetFriendRequests = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Searching for friend request
    FriendRequest.find({ gamerTwoId: req.query.gamer_id }, async (err, docs) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        // Finding gamers that emit each friend request
        let friendRequests = [];
        for (let doc of docs) {
            const fR = await Gamer.findById(doc.gamerOneId, "-password")
            friendRequests.push(fR);
        }
        // In case the gamer does not exists anymore, removing null object
        friendRequests = friendRequests.filter((fR) => fR != null);
        res.status(200).send(friendRequests);
        return;
    })
}

export const SendFriendRequest = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // searching if the both gamers exist
    const gamer = await Gamer.findById(req.body.gamer._id);
    const friend = await Gamer.findById(req.body.friend._id);

    if(gamer && friend) {
        // Searching if the friend request exists
        const existingFriendRequest = await FriendRequest.findOne({
            gamerOneId: gamer._id,
            gamerTwoId: friend._id 
        });
        if(existingFriendRequest == null) {
            // creating a new friend request
            const friendRequest = new FriendRequest({
                gamerOneId: gamer._id,
                gamerTwoId: friend._id
            });

            friendRequest.save((err, doc) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.status(200).send({friendRequest: doc})
            })
        } else {
            res.status(409).send({ message: 'Friend Request exists' });
        }
    } else {
        res.status(404).send({ message: 'One or both of the gamers do not exists' });
    }
}

export const RespondToFriendRequest = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Finding both gamers
    const friend = await Gamer.findById(req.body.friend._id, "-password");
    const gamer = await Gamer.findById(req.body.gamer._id, "-password");
    if(gamer && friend && friend._id != gamer._id) {
        // Updating both gamer's friends
        await Gamer.updateOne(
            { _id: gamer._id }, 
            { $addToSet: { friends: friend._id } })
        await Gamer.updateOne(
            { _id: friend._id }, 
            { $addToSet: { friends: gamer._id } })
        // Removing friend Request
        await FriendRequest.findOneAndDelete({
                gamerOneId: friend._id,
                gamerTwoId: gamer._id 
            });
        res.status(200).send({ message: "friend request accepted" });
    } else {
        res.status(404).send({ message: 'One or both of the gamers do not exists' });
    }
}


export const Signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const gamer = new Gamer({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    gamer.save((err, gamer) => {
        if (err) {
            res.status(500).send({ message: 'Sign Up has failed', error: err });
            return;
        }
        Signin(req, res);
    });
}

export const Signin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        Gamer.findOne({
            username: req.body.username
        })
            .exec(async (err, gamer) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                if (!gamer) {
                    return res.status(404).send({ message: "Username is not registered!" });
                }

                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    gamer.password
                );

                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Login details are not valid!!"
                    });
                }

                //@WARNING: to change
                var token = jwt.sign({ id: gamer.id }, 'thisisasecret', {
                    expiresIn: 86400 // 24 hours
                });
                
                res.status(200).send({
                    _id: gamer._id,
                    username: gamer.username,
                    email: gamer.email,
                    accessToken: token,
                    friends: gamer.friends
                });
                return;
            });
}

function indexOfGamer(gamer, friends) {
    var i = 0;
    while (i < friends.length) {
      if (friends[i] && friends[i].toString() == gamer._id.toString()) {
        return i;
      }
      i++;
    }
    return -1;
}

function indexOfGamer2(gamer, friends) {
    var i = 0;
    while (i < friends.length) {
      if (friends[i] && friends[i]._id.toString() == gamer._id.toString()) {
        return i;
      }
      i++;
    }
    return -1;
}
