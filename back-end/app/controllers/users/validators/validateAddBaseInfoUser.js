const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateAddBaseInfoUser = [
  check('gender')
    .optional()
    .isIn(['زن', 'مرد'])
    .withMessage("VALID: ['زن', 'مرد']"),
  check('marital')
    .optional()
    .isIn(['مجرد', 'متاهل'])
    .withMessage("VALID: ['مجرد', 'متاهل']"),
  check('military')
    .optional()
    .isIn([
      'مشمول',
      'در حال خدمت',
      'پایان خدمت',
      'معاف',
      'معافیت تحصیلی',
      'معافیت غیر پزشکی',
      'معافیت پزشکی'
    ])
    .withMessage(
      "VALID: ['مشمول', 'در حال خدمت', 'پایان خدمت',   'معاف',  'معافیت تحصیلی', 'معافیت غیر پزشکی', 'معافیت پزشکی']"
    ),
  check('birthDay').optional().isDate().withMessage('IT_SHOULD_BE_DATE'),
  check('firstName').optional(),
  check('lastName').optional(),
  check('image').optional(),
  check('job').optional(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateAddBaseInfoUser }
