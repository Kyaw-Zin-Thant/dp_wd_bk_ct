const fs = require('fs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/user.model')
const publicKey = fs.readFileSync('config/jwtRS256.key.pub', 'utf8')
const { ObjectId } = mongoose.Types
exports.checkToken = async (req, res, next) => {
  try {
    if (
      req.path === '/api/v1/users/login' ||
        req.path === '/api/v1/users/signup' ||
        req.path.includes('/public/uploads/') ||
        req.method === 'OPTIONS'
    ) {
      if (req.path === '/api/v1/users/login' && req.method === 'POST') {
        return next()
      } else {
        return next()
      }
    } else {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, publicKey, {
        algorithms: ['RS256']
      })
      const user = await User.findOne({
        _id: ObjectId(decoded.userId),
        status: 'ACTIVE'
      })
      if (user) {
        req.body.userId = decoded.userId
        return next()
      } else {
        return res.status(401).json({
          message:
              'Your account has been deactivated.Please contact admin team.'
        })
      }
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Token Expired'
    })
  }
}
