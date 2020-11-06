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
  createEducationHistoryUser,
  updateSimpleItem
} = require('../../controllers/users')

const {
  validateAddEducationHistory,
  validateAddEducationHistoryUser
} = require('../../controllers/users/validators')
const { getItem, getItems } = require('../../middleware/db')
const {
  handleError,
  isIDGood,
  buildErrObject
} = require('../../middleware/utils')
const EducationHistory = require('../../models/educationHistory')

/*
 * add or edit BaseInfo of user, by Admin
 */
router.post(
  '/:id/edus',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateAddEducationHistory,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      req.user = findUserById(id)
      await createEducationHistoryUser(req, res)
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * add or edit BaseInfo of user, by himself
 */
router.post(
  '/edus',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  validateAddEducationHistoryUser,
  createEducationHistoryUser
)

router.post(
  '/edus/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  validateAddEducationHistoryUser,
  async (req, res) => {
    try {
      if (req.user.role == 'admin') {
        await updateSimpleItem(req, res, EducationHistory)
        return
      }
      const id = req.params.id || ''
      if (Array.isArray(req.user.educationHistories)) {
        if (req.user.educationHistories.includes(id)) {
          await updateSimpleItem(req, res, EducationHistory)
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
  '/:id/edus',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      let user = findUserById(id)
      res.status(201).json(
        await getItems(req, EducationHistory, {
          _id: { $in: user.educationHistories }
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
  '/edus',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  async (req, res) => {
    try {
      res.status(201).json(
        await getItems(req, EducationHistory, {
          _id: { $in: req.user.educationHistories }
        })
      )
    } catch (err) {
      handleError(res, err)
    }
  }
)
router.get(
  '/edus/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      const id = req.params.id || ''
      if (req.user.role == 'admin') {
        res.status(201).json(await getItem(id, EducationHistory))
        return
      }
      if (Array.isArray(req.user.educationHistories)) {
        if (req.user.educationHistories.includes(id)) {
          res.status(201).json(await getItem(id, EducationHistory))
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
