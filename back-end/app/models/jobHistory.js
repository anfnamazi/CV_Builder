const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const JobHistorySchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String
    },
    jobGroup: {
      type: String,
      enum: ['موسیقی', 'تئاتر', ' فیلم', 'کتاب']
    },
    jobCenter: {
      type: String
    },
    titleCenter: {
      type: String
    },
    cooperateType: {
      type: String,
      enum: [
        'فراردادی تمام وقت',
        'قراردادی پاره وقت',
        'رسمی یا پیمانی',
        'ساعتی',
        'بدون قرارداد'
      ]
    },
    seniorLevel: {
      type: String,
      enum: ['تازه کار', 'کارشناس', 'خبره']
    },
    jobCountry: {
      type: String
    },
    jobProvince: {
      type: String
    },
    jobCity: {
      type: String
    },
    startJobMonth: {
      type: Number,
      max: 12
    },
    startJobYear: {
      type: String
    },
    endJobMonth: {
      type: Number,
      max: 12
    },
    endJobYear: {
      type: String
    },
    stillWorking: {
      type: Boolean
    },
    income: {
      type: String
    },
    number: {
      type: String
    },
    jobDescription: {
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

JobHistorySchema.plugin(mongoosePaginate)

module.exports = mongoose.model('JobHistory', JobHistorySchema)
