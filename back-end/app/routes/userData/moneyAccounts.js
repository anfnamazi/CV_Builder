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
  createMoneyAccountUser
} = require('../../controllers/users/createMoneyAccountUser')

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
const MoneyAccount = require('../../models/moneyAccount')

/*
 * add or edit BaseInfo of user, by Admin
 */
router.post(
  '/:id/moneyAccounts',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateAddSkill,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      req.user = findUserById(id)
      await createMoneyAccountUser(req, res)
    } catch (err) {
      handleError(res, err)
    }
  }
)
/*
 * add or edit BaseInfo of user, by himself
 */
router.post(
  '/moneyAccounts',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  // validateAddSkillUser,
  createMoneyAccountUser
)

router.post(
  '/moneyAccounts/:id',
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
      if (Array.isArray(req.user.moneyAccounts)) {
        if (req.user.moneyAccounts.includes(id)) {
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
  '/:id/moneyAccounts',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = await isIDGood(id)
      let user = await findUserById(id)
      res.status(201).json(
        await getItems(req, MoneyAccount, {
          _id: { $in: user.moneyAccounts }
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
  '/moneyAccounts',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  async (req, res) => {
    try {
      res.status(201).json(
        await getItems(req, MoneyAccount, {
          _id: { $in: req.user.moneyAccounts }
        })
      )
    } catch (err) {
      handleError(res, err)
    }
  }
)
router.get(
  '/moneyAccounts/:id',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      const id = req.params.id || ''
      if (req.user.role == 'admin') {
        res.status(201).json(await getItem(id, MoneyAccount))
        return
      }
      if (Array.isArray(req.user.moneyAccounts)) {
        if (req.user.moneyAccounts.includes(id)) {
          res.status(201).json(await getItem(id, MoneyAccount))
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
