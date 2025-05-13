const Joi = require("joi");

const listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string(),
  price: Joi.number().required(),
  location: Joi.string().required(),
  contactNumber: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.pattern.base': 'Contact number must be a 10-digit number',
    'string.empty': 'Contact number is required',
    'any.required': 'Contact number is required'
  })
});

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
});

module.exports = { listingSchema, contactSchema };
