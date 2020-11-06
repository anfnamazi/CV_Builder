const User = require('../../models/user')
const { buildErrObject } = require('../../middleware/utils')

/**
 * Checks User model if user with an specific email exists
 * @param {string} phone - user email
 */
const phoneExists = (phone = '') => {
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        phone
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }
        if (item) {
          //   return reject(buildErrObject(422, 'PHONE_ALREADY_EXISTS'))

          resolve(true)
        }
        resolve(false)
      }
    )
  })
}

module.exports = { phoneExists }
