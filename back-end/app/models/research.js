const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ResearchSchema = new mongoose.Schema(
  {
    researchType: {
      type: String
    },
    researchTitle: {
      type: String
    },
    articleType: {
      type: String
    },
    publisher: {
      type: String
    },
    researchHyperlink: {
      type: String
    },
    researchMonth: {
      type: Number,
      max: 12
    },
    researchYear: {
      type: String
    },
    researchDescription: {
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

ResearchSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Research', ResearchSchema)
