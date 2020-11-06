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
  createProjectUser,
  updateSimpleItem
} = require('../../controllers/users')

const {
  validateAddProject,
  validateAddProjectUser
} = require('../../controllers/users/validators')
const { getItem, getItems } = require('../../middleware/db')
const {
  handleError,
  isIDGood,
  buildErrObject
} = require('../../middleware/utils')
const Project = require('../../models/project')

/*
 * add or edit BaseInfo of user, by Admin
 */
router.post(
  '/:id/projects',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateAddProject,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      req.user = findUserById(id)
      await createProjectUser(req, res)
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * add or edit BaseInfo of user, by himself
 */
router.post(
  '/projects',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  validateAddProjectUser,
  createProjectUser
)

router.post(
  '/projects/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  validateAddProjectUser,
  async (req, res) => {
    try {
      if (req.user.role == 'admin') {
        await updateSimpleItem(req, res, Project)
        return
      }
      const id = req.params.id || ''
      if (Array.isArray(req.user.projects)) {
        if (req.user.projects.includes(id)) {
          await updateSimpleItem(req, res, Project)
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
  '/:id/projects',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      let user = findUserById(id)
      res.status(201).json(
        await getItems(req, Project, {
          _id: { $in: user.projects }
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
  '/projects',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  async (req, res) => {
    try {
      res.status(201).json(
        await getItems(req, Project, {
          _id: { $in: req.user.projects }
        })
      )
    } catch (err) {
      handleError(res, err)
    }
  }
)
router.get(
  '/projects/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      const id = req.params.id || ''
      if (req.user.role == 'admin') {
        res.status(201).json(await getItem(id, Project))
        return
      }
      if (Array.isArray(req.user.projects)) {
        if (req.user.projects.includes(id)) {
          res.status(201).json(await getItem(id, Project))
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
