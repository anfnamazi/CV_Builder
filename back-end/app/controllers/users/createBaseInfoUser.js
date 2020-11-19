const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { createBaseInfoInDB, addFileNameToReq } = require('./helpers')
const UserBaseInfo = require('../../models/userBaseInfo')

/**
 * Create contact item for user function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createBaseInfoUser = async (req, res) => {
  try {
    let user = req.user
    let userBaseInfoId = req.user.userBaseInfo
    let image = undefined
    if (req.file) {
      req = await addFileNameToReq(req, 'image')
      image = req.image
    }
    req = matchedData(req)
    if (image) {
      req.image = image
    }

    if (userBaseInfoId == null) {
      const item = await createBaseInfoInDB(req, user._id)
      user.userBaseInfo = item._id
      await user.save()
      res.status(201).json({ 'new item': item })
    } else {
      await UserBaseInfo.findOneAndUpdate({ _id: userBaseInfoId }, req)
      res.status(201).json({ 'editted Data': req })
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createBaseInfoUser }
