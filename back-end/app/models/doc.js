const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const DocSchema = new mongoose.Schema(
  {
    file: {
      type: String,
      required: true
    },
    docType: {
      type: String,
      enum: ['nationalCard', 'eduCertif']
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
DocSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Doc', DocSchema)
