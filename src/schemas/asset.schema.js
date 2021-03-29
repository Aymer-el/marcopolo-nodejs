import mongoose from 'mongoose';

const AssetSchema = new mongoose.Schema({
    _id: String,
    story: Number,
    assetName: String,
    assetType: String,
    workingWith: [String],
    skills: [Object],
    players: [String]
});