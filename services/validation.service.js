const Joi = require('joi')
exports.signUpValidation = (req, res, next) => {
  try {
    const data = req.body
    const schema = Joi.object().keys({
      fullname: Joi.string().optional().default(''),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      gender: Joi.string().required()
    })
    Joi.validate(schema, data, (err, value) => {
      if (err) {
        next(err)
      } else {
        next()
      }
    })
  } catch (error) {
    next(error)
  }
}
