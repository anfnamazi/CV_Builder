const User = require('../../models/user')
const { buildErrObject } = require('../../middleware/utils')
var phoneToken = require('generate-sms-verification-code')
/**
 * Checks User model if user with an specific email exists
 * @param {string} phone - user email
 */
const changeVerificationCode = (phone = '') => {
  return new Promise((resolve, reject) => {
    const newToken = phoneToken(6)
    User.updateOne(
      {
        phone
      },
      {
        $set: {
          verification: newToken
        }
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }
        resolve(newToken)
      }
    )
  })
}

module.exports = { changeVerificationCode }
