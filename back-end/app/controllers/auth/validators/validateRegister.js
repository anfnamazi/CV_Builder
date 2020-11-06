const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates register request
 */
const validateRegister = [
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

module.exports = { validateRegister }
