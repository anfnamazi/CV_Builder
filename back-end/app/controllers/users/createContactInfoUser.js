const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const { createContactInfoInDB } = require('./helpers')
const ContactInfo = require('../../models/contactInfo')
const { findUserById } = require('../auth/helpers')

/**
 * Create contact item for user function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createContactInfoUser = async (req, res) => {
  try {
    let user = req.user
    let contactInfoId = req.user.contactInfo
    req = matchedData(req)
    if (contactInfoId == null) {
      const item = await createContactInfoInDB(req, user._id)
      user.contactInfo = item._id
      await user.save()
      res.status(201).json(item)
    } else {
      await ContactInfo.findOneAndUpdate({ _id: contactInfoId }, req)
      res.status(201).json({ 'editted Data': req })
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createContactInfoUser }
