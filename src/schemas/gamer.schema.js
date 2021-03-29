import mongoose from 'mongoose';

const GamerSchema = new mongoose.Schema({
    username: String,
    email: String,
    picture: String,
    password: String,
    description: String,
    friends:  { type : Array , "default" : [] }
}, {
    strict: false
});

export default mongoose.model('Gamer', GamerSchema);