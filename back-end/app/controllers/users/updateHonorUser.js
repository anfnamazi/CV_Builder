const { matchedData } = require('express-validator')
const { handleError, isIDGood } = require('../../middleware/utils')
const Honor = require('../../models/honor')
const { updateItem } = require('../../middleware/db')

/**
 * Create contact item for user function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateHonorUser = async (req, res) => {
  try {
    let id = req.params.id || ''
    id = await isIDGood(id)
    req = matchedData(req)
    let item = await updateItem(id, Honor, req)
    res.status(200).json(item)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateHonorUser }
