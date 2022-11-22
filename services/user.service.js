const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const fs = require('fs')
const privateKey = fs.readFileSync('config/jwtRS256.key', 'utf8')
exports.userSignupService = async ({
  fullname,
  email,
  password,
  gender
}) => {
  const user = new User({
    fullname,
    email,
    password,
    gender
  })

  await user.save()

  return { message: 'Successfully Signed Up Your Account', userId: user._id }
}

exports.userSigninService = async ({ email, password }) => {
  const user = await User.findOne({ email })
  const token = jwt.sign(
    {
      userId: user._id
    },
    privateKey,
    {
      algorithm: 'RS256'
    }
  )
  bcrypt.compare(password, user.password, async (err, isMatch) => {
    delete user.password
    if (err) throw err
    if (isMatch) {
      return { message: 'Successfully login', user, token }
    }
  })
}

exports.checkDuplicateUser = async (email) => {
  const duplicateUser = await User.findOne({ email })
  return !!duplicateUser
}
