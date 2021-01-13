const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const languageschema = new mongoose.Schema(
  {
    Name: {
      type: String
    },
    readSkill: {
      type: Number,
      max: 100
    },
    writeSkill: {
      type: Number,
      max: 100
    },
    hearSkill: {
      type: Number,
      max: 100
    },
    speakSkill: {
      type: Number,
      max: 100
    },
    cert: {
      file: {
        type: String,
        required: false
      },
      fileType: {
        type: String
      },
      name: {
        type: String
      }
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
languageschema.plugin(mongoosePaginate)
module.exports = mongoose.model('Language', languageschema)
