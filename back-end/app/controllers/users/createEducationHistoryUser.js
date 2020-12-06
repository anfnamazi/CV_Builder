const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { createEducationHistoryInDB, addFileNameToReq } = require('./helpers')
const model = require('../../models/educationHistory')

/**
 * Create contact item for user function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createEducationHistoryUser = async (req, res) => {
  try {
    let user = req.user
    const edusCount = req.body.length
    let items = []
    const resultDelete = await model.deleteMany({ user: user._id })
    if (resultDelete) {
      user.educationHistories = []
      req.body.map(async (edusField) => {
        req = matchedData(req)
        const item = await createEducationHistoryInDB(edusField, user._id)
        user.educationHistories.push(item._id)

        items.push(item)
        if (edusCount === items.length) {
          await user.save()
          res.status(201).json({ 'new items': items })
        }
      })
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createEducationHistoryUser }
