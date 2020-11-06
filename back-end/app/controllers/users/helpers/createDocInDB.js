const model = require('../../../models/doc')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {String} userId - the user_id to add base info for
 */
const createDocInDB = ({ file = '', docType = '' }, userId) => {
  return new Promise((resolve, reject) => {
    const baseInfo = new model({
      file,
      docType,
      user: userId
    })
    baseInfo.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      item = JSON.parse(JSON.stringify(item))
      resolve(item)
    })
  })
}

module.exports = { createDocInDB }
