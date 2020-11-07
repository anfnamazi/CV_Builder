const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateAddEducationHistory = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('sectionEdu').optional(),
  check('fieldEdu').optional(),
  check('orientationEdu').optional(),
  check('uniType').optional(),
  check('uniName').optional(),
  check('averageEdu').optional(),
  check('uniCountry').optional(),
  check('uniProvince').optional(),
  check('uniCity').optional(),
  check('startEdu').optional(),
  check('endEdu').optional(),
  check('stillStudying')
    .optional()
    .isBoolean()
    .withMessage('SHOULD_BE_BOOLEAN'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateAddEducationHistory }
