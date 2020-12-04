const User = require('../../models/user')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const honor = require('../../models/honor')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUserPopulated = async (req, res) => {
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
      'docs',
      'skills',
      'honors'
    ])
    const doc = item.toObject({ getters: true })
    if (!doc.userBaseInfo) {
      doc.userBaseInfo = []
    }
    if (!doc.contactInfo) {
      doc.contactInfo = []
    }

    res.status(200).send(doc)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getUserPopulated }
