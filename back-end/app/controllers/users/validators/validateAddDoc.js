const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateAddDoc = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('file')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('docType')
    .exists()
    .withMessage('MISSING')
    .not()
    .isIn(['nationalCard', 'eduCertif'])
    .withMessage('POSSIBLE_VALUES: [nationalCard, eduCertif]'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateAddDoc }
