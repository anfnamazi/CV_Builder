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

const { createSkillUser, updateSkillUser } = require('../../controllers/users')

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
const Skill = require('../../models/skill')

/*
 * add or edit BaseInfo of user, by Admin
 */
router.post(
  '/:id/skills',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateAddSkill,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      req.user = findUserById(id)
      await createSkillUser(req, res)
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * add or edit BaseInfo of user, by himself
 */
router.post(
  '/skills',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  validateAddSkillUser,
  createSkillUser
)

router.post(
  '/skills/:id',
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
      if (Array.isArray(req.user.skills)) {
        if (req.user.skills.includes(id)) {
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
  '/:id/skills',
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
        .json(await getItems(req, Skill, { _id: { $in: user.skills } }))
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * get BaseInfo of user, by himself
 */
router.get(
  '/skills',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  async (req, res) => {
    try {
      res
        .status(201)
        .json(await getItems(req, Skill, { _id: { $in: req.user.skills } }))
    } catch (err) {
      handleError(res, err)
    }
  }
)
router.get(
  '/skills/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      const id = req.params.id || ''
      if (req.user.role == 'admin') {
        res.status(201).json(await getItem(id, Skill))
        return
      }
      if (Array.isArray(req.user.skills)) {
        if (req.user.skills.includes(id)) {
          res.status(201).json(await getItem(id, Skill))
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
