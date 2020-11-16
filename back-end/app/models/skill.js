const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const SkillSchema = new mongoose.Schema(
  {
    Name: {
      type: String
    },
    skillType: {
      type: String,
      enum: ['language', 'Experimental']
    },
    experienceSkillLevel: {
      type: Number,
      max: 100
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
SkillSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Skill', SkillSchema)
