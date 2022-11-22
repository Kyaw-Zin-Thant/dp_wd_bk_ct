const { checkDuplicateUser, userSignupService, userSigninService } = require('../services/user.service')

exports.userSignupRequestHandler = async (req, res, next) => {
  const {
    fullname,
    email,
    password,
    gender
  } = req.body
  try {
    const checkDuplicate = await checkDuplicateUser(email)

    if (checkDuplicate) {
      res.status(409).send({ message: 'Your account already exists' })
    } else {
      const response = await userSignupService({
        fullname,
        email,
        password,
        gender
      })
      res.json(response)
    }
  } catch (error) {
    next(error)
  }
}
exports.userSigninRequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const response = await userSigninService({ email, password })
    res.json(response)
  } catch (error) {

  }
}
