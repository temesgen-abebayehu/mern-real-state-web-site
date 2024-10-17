import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        require: true,
    },
    password:{
        type: String,
        minLength: 6,
        require: true,
    },
    avatar:{
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw1CygYv_YU1nrfw4FfHBhSj&ust=1729283909953000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLC7t-iilokDFQAAAAAdAAAAABAE",
    },
    
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;