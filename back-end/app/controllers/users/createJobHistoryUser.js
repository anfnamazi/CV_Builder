const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { createJobHistoryInDB } = require('./helpers')

/**
 * Create contact item for user function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createJobHistoryUser = async (req, res) => {
  try {
    let user = req.user
    req = matchedData(req)
    const item = await createJobHistoryInDB(req, user._id)
    user.jobHistories.push(item._id)
    await user.save()
    res.status(201).json({ 'new item': item })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createJobHistoryUser }
