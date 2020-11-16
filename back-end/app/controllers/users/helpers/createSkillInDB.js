const model = require('../../../models/skill')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {String} userId - the user_id to add base info for
 */
const createSkillInDB = (
  {
    Name = '',
    skillType = 'Experimental',
    experienceSkillLevel = 0,
    readSkill = 0,
    writeSkill = 0,
    hearSkill = 0,
    speakSkill = 0
  },
  userId
) => {
  return new Promise((resolve, reject) => {
    const skill = new model({
      Name,
      skillType,
      experienceSkillLevel,
      readSkill,
      writeSkill,
      hearSkill,
      speakSkill,
      user: userId
    })
    skill.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      item = JSON.parse(JSON.stringify(item))
      resolve(item)
    })
  })
}

module.exports = { createSkillInDB }
