const Joi = require('joi');

const objectValidationSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.min': 'Le nom de l\'objet doit contenir au moins 3 caractères.',
    'any.required': 'Le nom de l\'objet est obligatoire.',
  }),
  description: Joi.string().min(10).required().messages({
    'string.min': 'La description doit contenir au moins 10 caractères.',
    'any.required': 'La description est obligatoire.',
  })
});

const validateObject = (req, res, next) => {
  const { error } = objectValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateObject;
