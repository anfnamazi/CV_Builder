const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { createResearchInDB } = require('./helpers')

/**
 * Create contact item for user function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createResearchUser = async (req, res) => {
  try {
    let user = req.user
    req = matchedData(req)
    const item = await createResearchInDB(req, user._id)
    user.researchs.push(item._id)
    await user.save()
    res.status(201).json({ 'new item': item })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createResearchUser }
