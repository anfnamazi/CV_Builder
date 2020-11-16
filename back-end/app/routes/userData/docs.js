const express = require('express')
const router = express.Router()
require('../../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' }).single('file')
const { roleAuthorization } = require('../../controllers/auth')
const { findUserById } = require('../../controllers/auth/helpers')

const { createDocUser, updateDocUser } = require('../../controllers/users')

const {
  validateAddDocUser,
  validateAddDoc
} = require('../../controllers/users/validators')
const { getItem, getItems } = require('../../middleware/db')
const {
  handleError,
  isIDGood,
  buildErrObject
} = require('../../middleware/utils')
const Doc = require('../../models/doc')

/*
 * add or edit BaseInfo of user, by Admin
 */
router.post(
  '/:id/docs',
  requireAuth,
  roleAuthorization(['admin']),
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) handleError(res, buildErrObject(422, 'UNEXPECTED_FILE_KEY'))
      else next()
    })
  },
  trimRequest.all,
  validateAddDoc,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      req.user = findUserById(id)
      await createDocUser(req, res)
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * add or edit BaseInfo of user, by himself
 */
router.post(
  '/docs',
  requireAuth,
  roleAuthorization(['user']),
  // upload.single('file'),
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) handleError(res, buildErrObject(422, 'UNEXPECTED_FILE_KEY'))
      else next()
    })
  },
  trimRequest.all,
  validateAddDocUser,
  createDocUser
)

router.post(
  '/docs/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  // upload.single('file'),
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) handleError(res, buildErrObject(422, 'UNEXPECTED_FILE_KEY'))
      else next()
    })
  },
  trimRequest.all,
  validateAddDocUser,
  async (req, res) => {
    try {
      if (req.user.role == 'admin') {
        await updateDocUser(req, res)
        return
      }
      const id = req.params.id || ''
      if (Array.isArray(req.user.docs)) {
        if (req.user.docs.includes(id)) {
          await updateDocUser(req, res)
          return
        }
      }
      handleError(res, buildErrObject(404, 'NOT_FOUND'))
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * get BaseInfo of user, by Admin
 */
router.get(
  '/:id/docs',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = await isIDGood(id)
      let user = await findUserById(id)
      res
        .status(201)
        .json(await getItems(req, Doc, { _id: { $in: user.docs } }))
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * get BaseInfo of user, by himself
 */
router.get(
  '/docs',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  async (req, res) => {
    try {
      res
        .status(201)
        .json(await getItems(req, Doc, { _id: { $in: req.user.docs } }))
    } catch (err) {
      handleError(res, err)
    }
  }
)
router.get(
  '/docs/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      const id = req.params.id || ''
      if (req.user.role == 'admin') {
        res.status(201).json(await getItem(id, Doc))
        return
      }
      if (Array.isArray(req.user.docs)) {
        if (req.user.docs.includes(id)) {
          res.status(201).json(await getItem(id, Doc))
          return
        }
      }
      handleError(res, buildErrObject(404, 'NOT_FOUND'))
    } catch (err) {
      handleError(res, err)
    }
  }
)

module.exports = router
