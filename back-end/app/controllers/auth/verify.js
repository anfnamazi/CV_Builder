const { matchedData } = require('express-validator')
const {
  verificationExists,
  verifyUser,
  returnRegisterToken
} = require('./helpers')

const { handleError } = require('../../middleware/utils')

/**
 * Verify function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const verify = async (req, res) => {
  try {
    req = matchedData(req)
    const user = await verificationExists(req.id, req.phone)
    const userInfo = await verifyUser(user)
    const response = await returnRegisterToken(user.id, userInfo)

    res.status(200).json(response)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { verify }
