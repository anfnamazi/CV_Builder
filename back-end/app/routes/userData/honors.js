const express = require('express')
const router = express.Router()
require('../../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')
const { roleAuthorization } = require('../../controllers/auth')
const { findUserById } = require('../../controllers/auth/helpers')

const { createHonorUser, updateHonorUser } = require('../../controllers/users')

const {
  validateAddHonorUser,
  validateAddHonor
} = require('../../controllers/users/validators')
const { getItem, getItems } = require('../../middleware/db')
const {
  handleError,
  isIDGood,
  buildErrObject
} = require('../../middleware/utils')
const Honor = require('../../models/honor')

/*
 * add or edit BaseInfo of user, by Admin
 */
router.post(
  '/:id/honors',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateAddHonor,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      req.user = findUserById(id)
      await createHonorUser(req, res)
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * add or edit BaseInfo of user, by himself
 */
router.post(
  '/honors',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  validateAddHonorUser,
  createHonorUser
)

router.post(
  '/honors/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  validateAddHonorUser,
  async (req, res) => {
    try {
      if (req.user.role == 'admin') {
        await updateHonorUser(req, res)
        return
      }
      const id = req.params.id || ''
      if (Array.isArray(req.user.honors)) {
        if (req.user.honors.includes(id)) {
          await updateHonorUser(req, res)
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
  '/:id/honors',
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
        .json(await getItems(req, Honor, { _id: { $in: user.honors } }))
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * get BaseInfo of user, by himself
 */
router.get(
  '/honors',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  async (req, res) => {
    try {
      res
        .status(201)
        .json(await getItems(req, Honor, { _id: { $in: req.user.honors } }))
    } catch (err) {
      handleError(res, err)
    }
  }
)
router.get(
  '/honors/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      const id = req.params.id || ''
      if (req.user.role == 'admin') {
        res.status(201).json(await getItem(id, Honor))
        return
      }
      if (Array.isArray(req.user.honors)) {
        if (req.user.honors.includes(id)) {
          res.status(201).json(await getItem(id, Honor))
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
