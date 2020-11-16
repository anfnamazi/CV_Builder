const model = require('../../../models/honor')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {String} userId - the user_id to add base info for
 */
const createHonorInDB = (
  { honorTitle = '', honorMonth = 1, honorYear = '' },
  userId
) => {
  return new Promise((resolve, reject) => {
    const honor = new model({
      honorTitle,
      honorMonth,
      honorYear,
      user: userId
    })
    honor.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      item = JSON.parse(JSON.stringify(item))
      resolve(item)
    })
  })
}

module.exports = { createHonorInDB }
