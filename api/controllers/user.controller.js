import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';


export const updateUser = async (req, res, next) => {  
    
    if (req.user.id !== req.params.id) {        
        return next(errorHandler(403, 'Forbidden'));        
    }

    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username || req.user.username,
                email: req.body.email || req.user.email,
                password: req.body.password || req.user.password,
                avatar: req.body.avatar || req.user.avatar,
            },
        }, { new: true });

        const { password, ...others } = updatedUser._doc;
        res.status(200).json(others);
    } catch (error) {
        next(errorHandler(400, error.message));
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(403, 'Forbidden'));
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('token');
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(errorHandler(400, error.message));
    }
};