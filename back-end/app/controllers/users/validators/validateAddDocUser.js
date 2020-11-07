const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateAddDocUser = [
  check('docType')
    .exists()
    .withMessage('MISSING')
    .isIn(['nationalCard', 'eduCertif'])
    .withMessage('POSSIBLE_VALUES: [nationalCard, eduCertif]')
    .custom((value, { req }) => {
      if (!req.file) throw new Error('document file is required')
      return true
    }),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateAddDocUser }
