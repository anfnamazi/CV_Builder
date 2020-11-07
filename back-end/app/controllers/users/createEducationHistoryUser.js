const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { createEducationHistoryInDB, addFileNameToReq } = require('./helpers')

/**
 * Create contact item for user function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createEducationHistoryUser = async (req, res) => {
  try {
    let user = req.user
    req = matchedData(req)
    const item = await createEducationHistoryInDB(req, user._id)
    user.educationHistories.push(item._id)
    await user.save()
    res.status(201).json({ 'new item': item })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createEducationHistoryUser }
