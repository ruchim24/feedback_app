const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId : String
});

//creating a new collection users
mongoose.model('users',userSchema);