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

const { createContactInfoUser } = require('../../controllers/users')

const {
  validateAddContactInfo,
  validateAddContactInfoUser
} = require('../../controllers/users/validators')
const { getItem } = require('../../middleware/db')
const { handleError, isIDGood } = require('../../middleware/utils')
const ContactInfo = require('../../models/contactInfo')

router.post(
  '/contactInfo',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  validateAddContactInfoUser,
  createContactInfoUser
)
router.post(
  '/:id/contactInfo',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateAddContactInfo,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      req.user = findUserById(id)
      await createContactInfoUser(req, res)
    } catch (err) {
      handleError(res, err)
    }
  }
)
router.get(
  '/:id/contactInfo',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  async (req, res) => {
    try {
      let id = req.params.id || ''
      id = isIDGood(id)
      let user = findUserById(id)
      res.status(201).json(await getItem(user.contactInfo, ContactInfo))
    } catch (err) {
      handleError(res, err)
    }
  }
)
router.get(
  '/contactInfo',
  requireAuth,
  roleAuthorization(['user']),
  trimRequest.all,
  async (req, res) => {
    try {
      res.status(201).json(await getItem(req.user.contactInfo, ContactInfo))
    } catch (err) {
      handleError(res, err)
    }
  }
)

module.exports = router
