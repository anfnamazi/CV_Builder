const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const UserInfoSchema = new mongoose.Schema(
  {
    email: {
      type: String
    },
    phone: {
      type: String
    },
    tel: {
      type: String
    },
    webPage: {
      type: String
    },
    country: {
      type: String
    },
    province: {
      type: String
    },
    city: {
      type: String
    },
    address: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    socialMediaName: {
      type: String
    },
    socialMediaId: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = mongoose.model('ContactInfo', UserInfoSchema)
