const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isAdmin } = require("../middleware.js");
const router = express.Router();
const sampleListings = require("../init/data.js");

// Set up multer storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});
const upload = multer({ storage: storage });

// Middleware to validate the listing
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body.listing);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, msg);
  }
  next();
};

// Check if user is owner or admin
const isOwnerOrAdmin = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }
  if (listing.owner.equals(req.user._id) || req.user.isAdmin) {
    return next();
  }
  throw new ExpressError(403, "You do not have permission to perform this action");
};

// Add this new route at the beginning of your routes
router.get("/all", (req, res) => {
    res.render("listings/all-listings", { sampleListings });
});

// ✅ Main listings page
router.get("/", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
}));

// ✅ Create new listing with image upload
router.post("/", isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(async (req, res) => {
  const newListing = new Listing(req.body.listing);

  // If there's a file uploaded, assign the image object to the listing
  if (req.file) {
    newListing.image = {
      filename: req.file.filename,
      url: "/uploads/" + req.file.filename,  // Construct the URL for the uploaded file
    };
  }

  // Set the owner of the listing
  newListing.owner = req.user._id;

  // Save the new listing to the database
  await newListing.save();

  // Flash a success message and redirect
  req.flash("success", "Listing created!");
  res.redirect("/listings");
}));

// ✅ Show form to create new listing
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

// ✅ Show single listing
router.get("/:id", isLoggedIn, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("owner");
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }
  res.render("listings/show", { listing });
}));

// ✅ Edit form
router.get("/:id/edit", isLoggedIn, isOwnerOrAdmin, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) throw new ExpressError(404, "Listing not found");
  res.render("listings/edit", { listing });
}));

// ✅ Update listing
router.put("/:id", isLoggedIn, isOwnerOrAdmin, upload.single("listing[image]"), validateListing, wrapAsync(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, "Invalid listing ID");
  }

  const listing = await Listing.findById(id);
  if (!listing) throw new ExpressError(404, "Listing not found");

  // If new image is uploaded
  if (req.file) {
    req.body.listing.image = {
      filename: req.file.filename,
      url: "/uploads/" + req.file.filename,  // Construct the URL for the uploaded file
    };
  }

  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
}));

// ✅ Delete listing
router.delete("/:id", isLoggedIn, isOwnerOrAdmin, wrapAsync(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, "Invalid listing ID");
  }

  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted successfully!");
  res.redirect("/listings");
}));

module.exports = router;
