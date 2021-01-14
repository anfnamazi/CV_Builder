const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const moneyAccountsschema = new mongoose.Schema(
  {
    accountNumber: {
      type: String
    },
    bankName: {
      type: String,
      max: 100
    },
    shabaNumber: {
      type: Number
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
moneyAccountsschema.plugin(mongoosePaginate)
module.exports = mongoose.model('MoneyAccount', moneyAccountsschema)
