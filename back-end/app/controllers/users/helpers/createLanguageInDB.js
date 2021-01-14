const model = require('../../../models/language')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {String} userId - the user_id to add base info for
 */
const createLanguageInDB = (
  {
    Name = '',
    readSkill = 0,
    writeSkill = 0,
    hearSkill = 0,
    speakSkill = 0,
    cert = ''
  },
  userId
) => {
  return new Promise((resolve, reject) => {
    const skill = new model({
      Name,
      readSkill,
      writeSkill,
      hearSkill,
      speakSkill,
      cert,
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

module.exports = { createLanguageInDB }
