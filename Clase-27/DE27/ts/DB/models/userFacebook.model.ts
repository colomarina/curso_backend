import mongoose from 'mongoose';

const userFacebookCollection = 'userFacebook'

const UserFacebookSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    facebookId: { type: String }
})

export const userFacebookModel = mongoose.model(userFacebookCollection, UserFacebookSchema)