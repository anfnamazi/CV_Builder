const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateAddHonorUser = [
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

module.exports = { validateAddHonorUser }
