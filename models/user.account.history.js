const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = mongoose.Schema.Types
const schema = {
  userId: {
    type: ObjectId,
    reuqired: true
  },
  balance: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    enum: ['DEPOSIT', 'WITHDRAW']
  }
}
const UserAccountHisSchema = new Schema(schema, {
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedDate'
  }
})
module.exports = mongoose.model(
  'USER_ACC_HIS',
  UserAccountHisSchema
)
