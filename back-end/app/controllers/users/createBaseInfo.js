const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const {
  createBaseInfoInDB,
  getUserBaseInfoById,
  addAvatarToReq
} = require('./helpers')
const UserBaseInfo = require('../../models/userBaseInfo')
const { findUserById } = require('../auth/helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createBaseInfo = async (req, res) => {
  try {
    const currentUserId = req.user._id
    req = await addAvatarToReq(req)
    const image = req.image
    let user = await findUserById(currentUserId)
    req = matchedData(req)
    req.image = image
    let id = user.role == 'admin' ? req.id : currentUserId
    id = await isIDGood(id)
    user = await findUserById(id)
    // const item = await User.findOne({ _id: req.id }).populate('userBaseInfo')
    const userBaseInfo = await getUserBaseInfoById(user.userBaseInfo)
    if (!userBaseInfo) {
      const item = await createBaseInfoInDB(req, user._id)
      user.userBaseInfo = item._id
      await user.save()
      res.status(201).json(item)
    } else {
      const item = await UserBaseInfo.findOneAndUpdate(
        { _id: userBaseInfo._id },
        req
      )
      res.status(201).json(req)
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createBaseInfo }
