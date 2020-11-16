const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')
const jsonexport = require('jsonexport')
const { roleAuthorization } = require('../controllers/auth')

const {
  getUsers,
  createUser,
  getUser,
  getUserCsv,
  updateUser,
  deleteUser
} = require('../controllers/users')

const {
  validateCreateUser,
  validateGetUser,
  validateUpdateUser,
  validateDeleteUser
} = require('../controllers/users/validators')

/*
 * Users routes
 */
router.use(require('./userData/baseInfo')) // base
router.use(require('./userData/contactInfo')) // contactInfo
router.use(require('./userData/docs')) // docs
router.use(require('./userData/educationHistories')) //edus
router.use(require('./userData/jobHistories')) // jobs
router.use(require('./userData/projects')) // projects
router.use(require('./userData/researchs')) // researchs

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['admin', 'user']),
  trimRequest.all,
  async (req, res) => {
    try {
      if (req.user.role == 'admin') {
        await getUsers(req, res)
        return
      }
      const id = req.user.id || ''
      req.params.id = id
      await getUser(req, res)
    } catch (err) {
      handleError(res, err)
    }
  }
)

router.get(
  '/csv',
  requireAuth,
  roleAuthorization(['admin', 'user']),
  trimRequest.all,
  async (req, res) => {
    try {
      // if (req.user.role == 'admin') {
      //   await getUsers(req, res)
      //   return
      // }
      const id = req.user.id || ''
      req.params.id = id
      await getUserCsv(req, res)
    } catch (err) {
      handleError(res, err)
    }
  }
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateCreateUser,
  createUser
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateGetUser,
  getUser
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateUpdateUser,
  updateUser
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateDeleteUser,
  deleteUser
)

module.exports = router
