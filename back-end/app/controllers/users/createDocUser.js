const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { createDocInDB, addFileNameToReq } = require('./helpers')

/**
 * Create contact item for user function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createDocUser = async (req, res) => {
  try {
    let user = req.user
    req = await addFileNameToReq(req, 'file')
    const file = req.file
    req = matchedData(req)
    req.file = file
    const item = await createDocInDB(req, user._id)
    user.docs.push(item._id)
    await user.save()
    res.status(201).json({ 'new item': item })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createDocUser }
