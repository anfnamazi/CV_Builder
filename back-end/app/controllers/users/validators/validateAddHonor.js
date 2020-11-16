const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateAddHonor = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('honorTitle').optional(),
  check('honorMonth')
    .optional()
    .isNumeric()
    .withMessage('SHOULD_BE_NUMERIC')
    .custom((value) => {
      if (value <= 12) return true
      return false
    })
    .withMessage('POSSIBLE_RANGE: 0 ~ 12'),
  check('honorYear').optional(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateAddHonor }
