const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const HonorSchema = new mongoose.Schema(
  {
    honorTitle: {
      type: String
    },
    honorMonth: {
      type: Number,
      max: 12
    },
    honorYear: {
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
HonorSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Honor', HonorSchema)
