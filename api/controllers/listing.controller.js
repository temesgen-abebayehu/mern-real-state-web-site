import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";


export const createListing = async (req, res, next) => {
    try {
        const listing = new Listing(req.body);
        await listing.save();
        res.status(201).json(listing);

    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const existListing = await Listing.findById(req.params.id);

    if(!existListing){
        return next(errorHandler(404, 'List Does not exist'));
    }

    if(req.user.id !== existListing.userRef.toString()){
        return next(errorHandler(401, 'You are not allowed to delete this list.'));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Successfully Deleted!'});
    } catch (error) {
        next(error);
    }
};

export const updateListing = async (req, res, next) => {
    const existListing = await Listing.findById(req.params.id);

    if(!existListing){
        return next(errorHandler(404, 'List not found.'));
    }

    if(req.user.id !== existListing.userRef){
        return next(errorHandler(401, 'You are not allowed edit this list!'));
    }

    try {
        const editedList = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json(editedList);
    } catch (error) {
        next(error);
    }
};