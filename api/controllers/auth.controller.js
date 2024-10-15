import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';


export const register = async (req, res, next) => {
    const {username, email, password } = req.body;
    try {
        const usernameExist = await User.findOne({username});
        if(usernameExist){
            return res.status(401).json({error: "Usename already taken"});
        }

        const emailExist = await User.findOne({email});
        if(emailExist){
            return res.status(400).json({error: "Email already taken"});
        }

        if(password.length < 6) {
            return res.status(400).json({error: "Password length should be at least 6 character"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashPassword,
        });

        user.save();

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};