const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');

// Show signup form
router.get('/signup', (req, res) => {
  res.render('users/signup');
});

// Handle signup logic
router.post(
  '/signup',
  wrapAsync(async (req, res, next) => {
    try {
      const { email, username, password, confirmPassword } = req.body;

      // Check if the password and confirmation match
      if (password !== confirmPassword) {
        req.flash('error', 'Passwords do not match!');
        return res.redirect('/signup');
      }

      // Check if a user with this email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        req.flash('error', 'Email already in use!');
        return res.redirect('/signup');
      }

      // Check if a user with this username already exists
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        req.flash('error', 'Username already taken!');
        return res.redirect('/signup');
      }

      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password); // Handles password hashing internally

      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash('success', 'Welcome to RentApartment!');
        res.redirect('/listings');
      });
    } catch (e) {
      req.flash('error', e.message);
      res.redirect('/signup');
    }
  })
);

// Show login form
router.get('/login', (req, res) => {
  res.render('users/login');
});

// Handle login logic
router.post(
  '/login',
  saveRedirectUrl,
  (req, res, next) => {
    // Customize login to use email for authentication
    passport.authenticate('local', { 
      usernameField: 'email',  // Use email as the username field
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  },
  (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect(req.session.redirectUrl || '/listings');
  }
);

// Handle logout
router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash('success', 'Logged out successfully!');
    res.redirect('/listings');
  });
});

module.exports = router;
