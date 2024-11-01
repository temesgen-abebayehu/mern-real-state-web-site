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

  if (!existListing) {
    return next(errorHandler(404, "List Does not exist"));
  }

  if (req.user.id !== existListing.userRef.toString()) {
    return next(errorHandler(401, "You are not allowed to delete this list."));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Successfully Deleted!" });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const existListing = await Listing.findById(req.params.id);

  if (!existListing) {
    return next(errorHandler(404, "List not found."));
  }

  if (req.user.id !== existListing.userRef) {
    return next(errorHandler(401, "You are not allowed edit this list!"));
  }

  try {
    const editedList = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(editedList);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const existListing = await Listing.findById(req.params.id);

    if (!existListing) {
      return next(errorHandler(404, "Listing not found"));
    }

    res.status(200).json(existListing);
  } catch (error) {
    next(error);
  }
};


export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const offer =
      req.query.offer === "true"
        ? true
        : req.query.offer === "false"
        ? false
        : { $in: [false, true] };
    const furnished =
      req.query.furnished === "true"
        ? true
        : req.query.furnished === "false"
        ? false
        : { $in: [false, true] };
    const parking =
      req.query.parking === "true"
        ? true
        : req.query.parking === "false"
        ? false
        : { $in: [false, true] };
    const type =
      req.query.type && req.query.type !== "all"
        ? req.query.type
        : { $in: ["sell", "rent"] };

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      type,
      parking,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(listings);
  } catch (error) {
    // Log error for debugging
    console.error("Error fetching listings:", error);
    next(error);
  }
};
