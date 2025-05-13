const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./user.js");  // Import the User model for referencing

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: String,
    url: String,
  },
  price: Number,
  location: String,
  contactNumber: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
