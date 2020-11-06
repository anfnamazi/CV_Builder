const uuid = require('uuid')
const User = require('../../../models/user')
const { buildErrObject } = require('../../../middleware/utils')
var phoneToken = require('generate-sms-verification-code')

/**
 * Registers a new user in database
 * @param {Object} req - request object
 */
const registerUser = (req = {}) => {
  return new Promise((resolve, reject) => {
    const user = new User({
      phone: req.phone,
      verification: phoneToken(6)
    })
    user.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      resolve(item)
    })
  })
}

module.exports = { registerUser }
