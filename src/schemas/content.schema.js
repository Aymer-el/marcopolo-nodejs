const contentSchema = new mongoose.Schema({
    _id: String,
    storyId: String,
    name: String,
    description: String,
    gameMaster : [String],
    gamePlayer : [String],
    seenBy: [String]
});