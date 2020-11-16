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
  createJobHistoryUser,
  updateSimpleItem
} = require('../../controllers/users')

const {
  validateAddJobHistory,
  validateAddJobHistoryUser
} = require('../../controllers/users/validators')
const { getItem, getItems } = require('../../middleware/db')
const {
  handleError,
  isIDGood,
  buildErrObject
} = require('../../middleware/utils')
const JobHistory = require('../../models/jobHistory')

/*
 * add or edit BaseInfo of user, by Admin
 */
router.post(
  '/:id/jobs',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateAddJobHistory,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      req.user = findUserById(id)
      await createJobHistoryUser(req, res)
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * add or edit BaseInfo of user, by himself
 */
router.post(
  '/jobs',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  validateAddJobHistoryUser,
  createJobHistoryUser
)

router.post(
  '/jobs/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  validateAddJobHistoryUser,
  async (req, res) => {
    try {
      if (req.user.role == 'admin') {
        await updateSimpleItem(req, res, JobHistory)
        return
      }
      const id = req.params.id || ''
      if (Array.isArray(req.user.jobHistories)) {
        if (req.user.jobHistories.includes(id)) {
          await updateSimpleItem(req, res, JobHistory)
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
  '/:id/jobs',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = await isIDGood(id)
      let user = await findUserById(id)
      res.status(201).json(
        await getItems(req, JobHistory, {
          _id: { $in: user.jobHistories }
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
  '/jobs',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  async (req, res) => {
    try {
      res.status(201).json(
        await getItems(req, JobHistory, {
          _id: { $in: req.user.jobHistories }
        })
      )
    } catch (err) {
      handleError(res, err)
    }
  }
)
router.get(
  '/jobs/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      const id = req.params.id || ''
      if (req.user.role == 'admin') {
        res.status(201).json(await getItem(id, JobHistory))
        return
      }
      if (Array.isArray(req.user.jobHistories)) {
        if (req.user.jobHistories.includes(id)) {
          res.status(201).json(await getItem(id, JobHistory))
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
