const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    center: {
        type: String,
        required: true,
    },
    enrollment_id: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    contact_no: {
        type: Number,
        required: true,
    },
})

const User = mongoose.model("User",userSchema);
module.exports = User;