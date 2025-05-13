const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');


// GET /contact - show contact form
router.get('/contact', (req, res) => {
  res.render('includes/contact');
});

// POST /contact - save contact message
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    req.flash('success', 'Message sent successfully!');
    res.redirect('/contact');
  } catch (error) {
    req.flash('error', 'Error sending message.');
    res.redirect('/contact');
  }
});

module.exports = router;
