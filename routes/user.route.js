const express = require('express')

const {
  userSignupRequestHandler,
  userSigninRequestHandler
} = require('../controllers/user.controller')
const { signUpValidation } = require('../services/validation.service')
const router = express.Router()
const baseURL = '/api/v1'

/**
 * user account signup
 */
router
  .route(`${baseURL}/users/signup`)
  .post(signUpValidation, userSignupRequestHandler)

/**
 * user login
 */
router.route(`${baseURL}/users/login`).post(userSigninRequestHandler)

exports.default = (app) => {
  app.use('/', router)
}
