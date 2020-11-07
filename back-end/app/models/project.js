const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ProjectSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String
    },
    projectEmployer: {
      type: String
    },
    projectHyperlink: {
      type: String
    },
    startProjectMonth: {
      type: Number,
      max: 12
    },
    startProjectYear: {
      type: String
    },
    endProjectMonth: {
      type: Number,
      max: 12
    },
    endProjectYear: {
      type: String
    },
    projectDescription: {
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

ProjectSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Project', ProjectSchema)
