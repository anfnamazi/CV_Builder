const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const experimentschema = new mongoose.Schema(
  {
    Name: {
      type: String
    },
    skillLevel: {
      type: Number,
      max: 100
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
experimentschema.plugin(mongoosePaginate)
module.exports = mongoose.model('Experiment', experimentschema)
