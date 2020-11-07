const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const UserBaseInfoSchema = new mongoose.Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    image: {
      type: String
    },
    job: {
      type: String
    },
    gender: {
      type: String,
      enum: ['مرد', 'زن']
    },
    marital: {
      type: String,
      enum: ['مجرد', 'متاهل']
    },
    military: {
      type: String,
      enum: [
        'مشمول',
        'در حال خدمت',
        'پایان خدمت',
        'معاف',
        'معافیت تحصیلی',
        'معافیت غیر پزشکی',
        'معافیت پزشکی'
      ]
    },
    birthDay: {
      type: Date
    },
    description: {
      type: String
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

module.exports = mongoose.model('UserBaseInfo', UserBaseInfoSchema)