const { buildErrObject } = require('../../../middleware/utils')

/**
 * Verifies an user
 * @param {Object} user - user object
 */
const verifyUser = (user = {}) => {
  return new Promise((resolve, reject) => {
    user.verified = true
    user.save((err, item) => {
      if (err) {
        return reject(buildErrObject(422, err.message))
      }
      resolve({
        phone: item.phone,
        verified: item.verified
      })
    })
  })
}

module.exports = { verifyUser }
