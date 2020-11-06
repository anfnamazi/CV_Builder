const express = require('express')
const router = express.Router()
require('../../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const { roleAuthorization } = require('../../controllers/auth')
const { findUserById } = require('../../controllers/auth/helpers')

const { createBaseInfoUser } = require('../../controllers/users')

const {
  validateAddBaseInfo,
  validateAddBaseInfoUser
} = require('../../controllers/users/validators')
const { getItem } = require('../../middleware/db')
const { handleError, isIDGood } = require('../../middleware/utils')
const UserBaseInfo = require('../../models/userBaseInfo')

/*
 * add or edit BaseInfo of user, by Admin
 */
router.post(
  '/:id/base',
  requireAuth,
  roleAuthorization(['admin']),
  upload.single('image'),
  trimRequest.all,
  validateAddBaseInfo,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      req.user = findUserById(id)
      await createBaseInfoUser(req, res)
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * add or edit BaseInfo of user, by himself
 */
router.post(
  '/base',
  requireAuth,
  roleAuthorization(['user']),
  upload.single('image'),
  trimRequest.all,
  validateAddBaseInfoUser,
  createBaseInfoUser
)
/*
 * get BaseInfo of user, by Admin
 */
router.get(
  '/:id/base',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      let user = findUserById(id)
      res.status(201).json(await getItem(user.userBaseInfo, UserBaseInfo))
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * get BaseInfo of user, by himself
 */
router.get(
  '/base',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  async (req, res) => {
    try {
      res.status(201).json(await getItem(req.user.userBaseInfo, UserBaseInfo))
    } catch (err) {
      handleError(res, err)
    }
  }
)

module.exports = router
