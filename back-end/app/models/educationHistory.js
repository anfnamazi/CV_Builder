const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const EducationHistorySchema = new mongoose.Schema(
  {
    sectionEdu: {
      type: String
    },
    fieldEdu: {
      type: String
    },
    orientationEdu: {
      type: String
    },
    uniType: {
      type: String
    },
    uniName: {
      type: String
    },
    averageEdu: {
      type: String
    },
    uniCountry: {
      type: String
    },
    uniProvince: {
      type: String
    },
    uniCity: {
      type: String
    },
    startEdu: {
      type: String
    },
    endEdu: {
      type: String
    },
    stillStudying: {
      type: Boolean
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

EducationHistorySchema.plugin(mongoosePaginate)

module.exports = mongoose.model('EducationHistory', EducationHistorySchema)
