const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateAddContactInfoUser = [
  check('email').optional().isEmail().withMessage('NOT_VALID_EMAIL'),
  check('phone')
    .optional()
    .isMobilePhone('fa-IR')
    .withMessage('NOT_VALID_IR_MOBILE_PHONE'),
  check('tel').optional(),
  check('webPage').optional(),
  check('country').optional(),
  check('province').optional(),
  check('city').optional(),
  check('address').optional(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateAddContactInfoUser }
