const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates verify request
 */
const validateVerify = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('phone')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isMobilePhone('fa-IR')
    .withMessage('NOT_A_VALID_IR_MOBILE_PHONE'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateVerify }
