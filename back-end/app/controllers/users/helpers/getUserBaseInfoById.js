const User = require('../../../models/user')
const UserBaseInfo = require('../../../models/userBaseInfo')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Get UserBaseInfo by id
 * @param {string} _id - UserBaseInfo id
 */
const getUserBaseInfoById = (_id = '') => {
  return new Promise((resolve, reject) => {
    if (_id == '') {
      resolve(false)
      return
    }
    UserBaseInfo.findById(_id, async (err, item) => {
      // console.log('err', err)
      // console.log('item', item)
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
    })
  })
}

module.exports = { getUserBaseInfoById }
