import mongoose from 'mongoose';

const FriendRequestSchema = new mongoose.Schema({
    gamerOneId: String,
    gamerTwoId: String
});

export default mongoose.model('FriendRequest', FriendRequestSchema);