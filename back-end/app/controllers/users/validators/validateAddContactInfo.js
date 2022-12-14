const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateAddContactInfo = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('email').optional(),
  check('phone')
    .optional()
    .isMobilePhone('fa-IR')
    .withMessage('لطفا شماره موبایل خود را بررسی کنید'),
  check('tel').optional(),
  check('webPage').optional(),
  check('country').optional(),
  check('province').optional(),
  check('city').optional(),
  check('address').optional(),
  check('socialMediaName').optional(),
  check('socialMediaId').optional(),
  check('sanaCode').optional(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateAddContactInfo }
