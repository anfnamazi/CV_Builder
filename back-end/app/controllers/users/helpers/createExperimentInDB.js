const model = require('../../../models/experiment')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {String} userId - the user_id to add base info for
 */
const createExperimentInDB = (
  { Name = '', skillLevel = 0, description = '' },
  userId
) => {
  return new Promise((resolve, reject) => {
    const skill = new model({
      Name,
      skillLevel,
      description,
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

module.exports = { createExperimentInDB }
