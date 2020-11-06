const { matchedData } = require('express-validator')

const { registerUser, setUserInfo } = require('./helpers')
const { handleError } = require('../../middleware/utils')
const {
  phoneExists,
  sendVerificationSMS,
  changeVerificationCode
} = require('../../middleware/auth')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const register = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale()
    req = matchedData(req)

    const userExists = await phoneExists(req.phone)

    if (!userExists) {
      const item = await registerUser(req)
      const userInfo = await setUserInfo(item)
      // sendVerificationSMS(item.phone, item.verification)
      console.log('verification: ', item.verification)
      res.status(201).json({ 'new user': userInfo })
    } else {
      const newToken = await changeVerificationCode(req.phone)
      // const data = await sendVerificationSMS(req.phone, newToken)
      console.log('verification: ', newToken)
      res.status(202).json('verification SMS sent')
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { register }
