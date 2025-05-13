// middleware.js
const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirect = req.originalUrl;
    req.flash("error", "You must be logged in first");
    return res.redirect("/login");
  }
  next();
};

const saveRedirectUrl = (req, res, next) => {
  if (req.session.redirect) {
    res.locals.redirectUrl = req.session.redirect;
    delete req.session.redirect;
  }
  next();
};

const isListingAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    if (!listing.owner.equals(req.user._id)) {
      req.flash("error", "You don't have permission to do that!");
      return res.redirect(`/listings/${id}`);
    }
    
    next();
  } catch (error) {
    console.error("Error in isListingAuthor middleware:", error);
    req.flash("error", "Something went wrong");
    res.redirect("/listings");
  }
};

module.exports = { 
  isLoggedIn, 
  saveRedirectUrl, 
  isListingAuthor 
};

module.exports.isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        req.flash("error", "You need administrator privileges to perform this action");
        return res.redirect("/listings");
    }
    next();
};

