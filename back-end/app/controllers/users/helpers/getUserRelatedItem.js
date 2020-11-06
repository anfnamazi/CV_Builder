const { itemNotFound } = require('../../../middleware/utils')

/**
 * Get UserBaseInfo by id
 * @param {string} _id - UserBaseInfo id
 */
const getUserRelatedItem = (_id = '', model = '') => {
  return new Promise((resolve, reject) => {
    if ((_id == '') | (model == '')) {
      reject('id or model is empty')
      return
    }
    model.findById(_id, async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND')
        resolve(item)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { getUserRelatedItem }
