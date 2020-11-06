const User = require('../../../models/user')
const UserBaseInfo = require('../../../models/userBaseInfo')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Get UserBaseInfo by UserId
 * @param {string} id - user´s id
 */
const getUserBaseInfoByUserId = (userId = '') => {
  return new Promise((resolve, reject) => {
    UserBaseInfo.find(
      {
        user: userId
      },
      async (err, item) => {
        console.log('err', err)
        console.log('item', item)
        try {
          if (err) {
            reject(err)
          } else if (!item) {
            resolve(false)
          } else {
            resolve(item)
          }
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { getUserBaseInfoByUserId }
