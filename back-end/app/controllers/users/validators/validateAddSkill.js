const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateAddSkill = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('Name').optional(),
  check('skillType')
    .optional()
    .isIn(['language', 'Experimental'])
    .withMessage('POSSIBLE_VALUES: [language, Experimental]'),
  check('experienceSkillLevel')
    .optional()
    .isNumeric()
    .withMessage('SHOULD_BE_NUMERIC')
    .custom((value) => {
      if (value <= 100) return true
      return false
    })
    .withMessage('POSSIBLE_RANGE: 0 ~ 100'),

  check('readSkill')
    .optional()
    .isNumeric()
    .withMessage('SHOULD_BE_NUMERIC')
    .custom((value) => {
      if (value <= 100) return true
      return false
    })
    .withMessage('POSSIBLE_RANGE: 0 ~ 100'),
  check('writeSkill')
    .optional()
    .isNumeric()
    .withMessage('SHOULD_BE_NUMERIC')
    .custom((value) => {
      if (value <= 100) return true
      return false
    })
    .withMessage('POSSIBLE_RANGE: 0 ~ 100'),
  check('hearSkill')
    .optional()
    .isNumeric()
    .withMessage('SHOULD_BE_NUMERIC')
    .custom((value) => {
      if (value <= 100) return true
      return false
    })
    .withMessage('POSSIBLE_RANGE: 0 ~ 100'),
  check('speakSkill')
    .optional()
    .isNumeric()
    .withMessage('SHOULD_BE_NUMERIC')
    .custom((value) => {
      if (value <= 100) return true
      return false
    })
    .withMessage('POSSIBLE_RANGE: 0 ~ 100'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateAddSkill }
