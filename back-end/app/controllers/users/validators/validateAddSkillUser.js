const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateAddSkillUser = [
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
      if (value <= 5) return true
      return false
    })
    .withMessage('POSSIBLE_RANGE: 0 ~ 5'),

  check('readSkill')
    .optional()
    .isNumeric()
    .withMessage('SHOULD_BE_NUMERIC')
    .custom((value) => {
      if (value <= 5) return true
      return false
    })
    .withMessage('POSSIBLE_RANGE: 0 ~ 5'),
  check('writeSkill')
    .optional()
    .isNumeric()
    .withMessage('SHOULD_BE_NUMERIC')
    .custom((value) => {
      if (value <= 5) return true
      return false
    })
    .withMessage('POSSIBLE_RANGE: 0 ~ 5'),
  check('hearSkill')
    .optional()
    .isNumeric()
    .withMessage('SHOULD_BE_NUMERIC')
    .custom((value) => {
      if (value <= 5) return true
      return false
    })
    .withMessage('POSSIBLE_RANGE: 0 ~ 5'),
  check('speakSkill')
    .optional()
    .isNumeric()
    .withMessage('SHOULD_BE_NUMERIC')
    .custom((value) => {
      if (value <= 5) return true
      return false
    })
    .withMessage('POSSIBLE_RANGE: 0 ~ 5'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateAddSkillUser }
