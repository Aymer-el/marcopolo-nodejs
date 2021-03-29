import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    gameMaster : [String],
    gamePlayer : [String],
    lastMessages: [String]
});

export default mongoose.model('Story', StorySchema);