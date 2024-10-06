import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        require: true,
    },
    fullname:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        require: true,
    },
    password:{
        type: String,
        minlength: 6,
        require: true,
    },
    profileImg:{
        type: String,
        default: '',
    },
    
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;