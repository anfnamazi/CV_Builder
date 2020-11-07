const { matchedData } = require('express-validator')
const { handleError, isIDGood } = require('../../middleware/utils')
const { updateItem } = require('../../middleware/db')

/**
 * Create contact item for user function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateSimpleItem = async (req, res, model = {}) => {
  try {
    let id = req.params.id || ''
    id = await isIDGood(id)
    req = matchedData(req)
    let item = await updateItem(id, model, req)
    res.status(200).json(item)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateSimpleItem }
