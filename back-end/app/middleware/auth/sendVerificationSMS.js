const axios = require('axios')
const { buildErrObject } = require('../utils')

/**
 * Sends verification sms
 * @param {Object} user - user object
 */
const sendVerificationSMS = (phone, token) => {
  return new Promise((resolve, reject) => {
    const headers = {
      'Content-Type': 'application/json'
    }
    axios
      .get(
        process.env.SMS_URL +
          process.env.SMS_API_KEY +
          '/verify/lookup.json?receptor=' +
          phone +
          '&token=' +
          token +
          `&template=${process.env.SMS_TEMPLATE_VERIFY}`,
        {
          headers: headers
        }
      )
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) =>
        reject(buildErrObject(520, 'COULD_NOT_SEND_VERIFICATION_SMS'))
      )
  })
}

module.exports = { sendVerificationSMS }
