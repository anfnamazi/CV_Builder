const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateAddResearch = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('researchType')
    .optional()
    .isIn(['کتاب', 'مقاله', 'پایان نامه', 'سایر'])
    .withMessage('VALID_VALUES:  [کتاب, مقاله, پایان نامه, سایر]'),
  check('researchTitle').optional(),
  check('articleType')
    .optional()
    .isIn(['داخلی', 'خارجی'])
    .withMessage('VALID_VALUES: [داخلی, خارجی]'),
  check('publisher').optional(),
  check('researchHyperlink').optional(),
  check('researchMonth')
    .optional()
    .isNumeric()
    .withMessage('SHOULD_BE_NUMBER')
    .custom((val) => {
      return val < 13
    }),
  check('researchYear').optional(),
  check('researchDescription').optional(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateAddResearch }
