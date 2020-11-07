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

const {
  createResearchUser,
  updateSimpleItem
} = require('../../controllers/users')

const {
  validateAddResearch,
  validateAddResearchUser
} = require('../../controllers/users/validators')
const { getItem, getItems } = require('../../middleware/db')
const {
  handleError,
  isIDGood,
  buildErrObject
} = require('../../middleware/utils')
const Research = require('../../models/research')

/*
 * add or edit BaseInfo of user, by Admin
 */
router.post(
  '/:id/researchs',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateAddResearch,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      req.user = findUserById(id)
      await createResearchUser(req, res)
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * add or edit BaseInfo of user, by himself
 */
router.post(
  '/researchs',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  validateAddResearchUser,
  createResearchUser
)

router.post(
  '/researchs/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  validateAddResearchUser,
  async (req, res) => {
    try {
      if (req.user.role == 'admin') {
        await updateSimpleItem(req, res, Research)
        return
      }
      const id = req.params.id || ''
      if (Array.isArray(req.user.researchs)) {
        if (req.user.researchs.includes(id)) {
          await updateSimpleItem(req, res, Research)
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
  '/:id/researchs',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      let user = findUserById(id)
      res.status(201).json(
        await getItems(req, Research, {
          _id: { $in: user.researchs }
        })
      )
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * get BaseInfo of user, by himself
 */
router.get(
  '/researchs',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  async (req, res) => {
    try {
      res.status(201).json(
        await getItems(req, Research, {
          _id: { $in: req.user.researchs }
        })
      )
    } catch (err) {
      handleError(res, err)
    }
  }
)
router.get(
  '/researchs/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      const id = req.params.id || ''
      if (req.user.role == 'admin') {
        res.status(201).json(await getItem(id, Research))
        return
      }
      if (Array.isArray(req.user.researchs)) {
        if (req.user.researchs.includes(id)) {
          res.status(201).json(await getItem(id, Research))
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
