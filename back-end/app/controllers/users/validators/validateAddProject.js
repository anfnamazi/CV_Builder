const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateAddProject = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('projectTitle').optional(),
  check('projectEmployer').optional(),
  check('projectHyperlink').optional(),
  check('startProjectMonth')
    .optional()
    .isNumeric()
    .withMessage('SHOULD_BE_NUMBER')
    .custom((val) => {
      return val < 13
    }),
  check('startProjectYear').optional(),
  check('endProjectMonth')
    .optional()
    .isNumeric()
    .withMessage('SHOULD_BE_NUMBER')
    .custom((val) => {
      return val < 13
    }),
  check('endProjectYear').optional(),
  check('projectDescription').optional(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateAddProject }
