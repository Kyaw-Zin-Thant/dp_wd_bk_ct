const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 13
const { Schema } = mongoose
const schema = {
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    required: true
  },
  accountbalance: {
    type: Number,
    default: 0
  }
}
const UserSchema = new Schema(schema, {
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedDate'
  }
})
async function updateHash (next) {
  try {
    const user = this
    if (!user.isModified('password')) {
      return next()
    }
    const hash = bcrypt.hashSync(this.password, SALT_WORK_FACTOR)
    this.password = hash
    return next()
  } catch (err) {
    return next(err)
  }
}
UserSchema.pre('save', updateHash)

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}
module.exports = mongoose.model(
  'USER',
  UserSchema
)
