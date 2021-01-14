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

const { updateSkillUser } = require('../../controllers/users')
const {
  createExperimentUser
} = require('../../controllers/users/createExperimentUser')

const {
  validateAddSkillUser,
  validateAddSkill
} = require('../../controllers/users/validators')
const { getItem, getItems } = require('../../middleware/db')
const {
  handleError,
  isIDGood,
  buildErrObject
} = require('../../middleware/utils')
const Experiment = require('../../models/experiment')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

var cpUpload = upload.fields([{ name: 'cert', maxCount: 10 }])
/*
 * add or edit BaseInfo of user, by Admin
 */
router.post(
  '/:id/experiments',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateAddSkill,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      req.user = findUserById(id)
      await createExperimentUser(req, res)
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * add or edit BaseInfo of user, by himself
 */
router.post(
  '/experiments',
  requireAuth,
  roleAuthorization(['user']),
  cpUpload,
  trimRequest.all,
  // validateAddSkillUser,
  createExperimentUser
)

router.post(
  '/experiments/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  validateAddSkillUser,
  async (req, res) => {
    try {
      if (req.user.role == 'admin') {
        await updateSkillUser(req, res)
        return
      }
      const id = req.params.id || ''
      if (Array.isArray(req.user.experiments)) {
        if (req.user.experiments.includes(id)) {
          await updateSkillUser(req, res)
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
  '/:id/experiments',
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
        .json(
          await getItems(req, Experiment, { _id: { $in: user.experiments } })
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
  '/experiments',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  async (req, res) => {
    try {
      res.status(201).json(
        await getItems(req, Experiment, {
          _id: { $in: req.user.experiments }
        })
      )
    } catch (err) {
      handleError(res, err)
    }
  }
)
router.get(
  '/experiments/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      const id = req.params.id || ''
      if (req.user.role == 'admin') {
        res.status(201).json(await getItem(id, Experiment))
        return
      }
      if (Array.isArray(req.user.experiments)) {
        if (req.user.experiments.includes(id)) {
          res.status(201).json(await getItem(id, Experiment))
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
