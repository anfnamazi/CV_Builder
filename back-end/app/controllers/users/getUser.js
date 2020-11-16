const User = require('../../models/user')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUser = async (req, res) => {
  try {
    let userId = req.user.id
    req = matchedData(req)
    let id = req.id || userId
    id = await isIDGood(id)
    let item = await User.findOne({ _id: id }).populate([
      'userBaseInfo',
      'contactInfo',
      'educationHistories',
      'jobHistories',
      'researchs',
      'projects',
      'docs'
    ])
    res.status(200).json(item)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getUser }
