const model = require('../../../models/moneyAccount')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {String} userId - the user_id to add base info for
 */
const createMoneyAccountsInDB = (
  { accountNumber = '', bankName = '', shabaNumber = 0 },
  userId
) => {
  return new Promise((resolve, reject) => {
    const skill = new model({
      accountNumber,
      bankName,
      shabaNumber,
      user: userId
    })
    skill.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      item = JSON.parse(JSON.stringify(item))
      resolve(item)
    })
  })
}

module.exports = { createMoneyAccountsInDB }
