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
    let files = undefined
    if (req.files) {
      files = req.files
    }
    req = matchedData(req)
    if (files) {
      if (files.image) {
        const fileType = files.image[0].mimetype.split('/')[1]
        req.image = files.image
          ? {
              file: files.image[0].filename,
              fileType: fileType
            }
          : undefined
      }
      if (files.eduCertif) {
        const fileType = files.eduCertif[0].mimetype.split('/')[1]
        req.eduCertif = files.eduCertif
          ? {
              file: files.eduCertif[0].filename,
              title: files.eduCertif[0].originalname,
              fileType: fileType
            }
          : undefined
      }
      if (files.nationalCard) {
        const fileType = files.nationalCard[0].mimetype.split('/')[1]

        req.nationalCard = files.nationalCard
          ? {
              file: files.nationalCard[0].filename,
              title: files.nationalCard[0].originalname,
              fileType: fileType
            }
          : undefined
      }
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
