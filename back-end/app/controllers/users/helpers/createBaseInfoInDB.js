const model = require('../../../models/userBaseInfo')
const { buildErrObject } = require('../../../middleware/utils')
const { Schema } = require('mongoose')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {String} userId - the user_id to add base info for
 */

const createBaseInfoInDB = (
  {
    firstName = '',
    lastName = '',
    job = '',
    image = '',
    gender = 'مرد',
    marital = 'مجرد',
    military = 'مشمول',
    description = '',
    birthDay = ''
  },
  userId
) => {
  return new Promise((resolve, reject) => {
    const baseInfo = new model({
      firstName,
      lastName,
      image,
      job,
      marital,
      gender,
      military,
      description,
      birthDay,
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

module.exports = { createBaseInfoInDB }
