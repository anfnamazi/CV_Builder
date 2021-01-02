const model = require('../../../models/contactInfo')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {String} userId - the user_id to add base info for
 */
const createContactInfoInDB = (
  {
    email = '',
    phone = '',
    tel = '',
    webPage = '',
    country = '',
    province = '',
    city = '',
    address = '',
    socialMediaName = '',
    socialMediaId = '',
    sanaCode = ''
  },
  userId
) => {
  return new Promise((resolve, reject) => {
    const ContactInfo = new model({
      email,
      phone,
      tel,
      webPage,
      country,
      province,
      city,
      address,
      socialMediaName,
      socialMediaId,
      sanaCode,
      user: userId
    })
    ContactInfo.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      item = JSON.parse(JSON.stringify(item))
      resolve(item)
    })
  })
}

module.exports = { createContactInfoInDB }
