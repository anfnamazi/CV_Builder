const { matchedData } = require('express-validator')
const { handleError, isIDGood } = require('../../middleware/utils')
const { addFileNameToReq } = require('./helpers')
const Doc = require('../../models/doc')
const { updateItem } = require('../../middleware/db')

/**
 * Create contact item for user function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateDocUser = async (req, res) => {
  try {
    let id = req.params.id || ''
    id = await isIDGood(id)
    req = await addFileNameToReq(req, 'file')
    const file = req.file
    req = matchedData(req)
    req.file = file
    let item = await updateItem(id, Doc, req)
    res.status(200).json(item)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateDocUser }
