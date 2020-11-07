const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateAddJobHistory = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('jobTitle').optional(),
  check('jobGroup')
    .optional()
    .isIn(['موسیقی', 'تئاتر', ' فیلم', 'کتاب'])
    .withMessage('VALID_VALUES: [موسیقی, تئاتر,  فیلم, کتاب]'),
  check('jobCenter').optional(),
  check('titleCenter').optional(),
  check('cooperateType')
    .optional()
    .isIn([
      'فراردادی تمام وقت',
      'قراردادی پاره وقت',
      'رسمی یا پیمانی',
      'ساعتی',
      'بدون قرارداد'
    ])
    .withMessage(
      'VALID_VALUES: [فراردادی تمام وقت,قراردادی پاره وقت,رسمی یا پیمانی,ساعتی,بدون قرارداد]'
    ),
  check('seniorLevel')
    .optional()
    .isIn(['تازه کار', 'کارشناس', 'خبره'])
    .withMessage('VALID_VALUES: [تازه کار, کارشناس, خبره]'),
  check('jobCountry').optional(),
  check('jobProvince').optional(),
  check('jobCity').optional(),
  check('startJobMonth')
    .optional()
    .isNumeric()
    .withMessage('SHOULD_BE_NUMBER')
    .custom((val) => {
      return val < 13
    }),
  check('startJobYear').optional(),
  check('endJobMonth')
    .optional()
    .isNumeric()
    .withMessage('SHOULD_BE_NUMBER')
    .custom((val) => {
      return val < 13
    }),
  check('endJobYear').optional(),
  check('stillWorking').optional().isBoolean().withMessage('SHOULD_BE_BOOLEAN'),
  check('income').optional(),
  check('number').optional(),
  check('jobDescription').optional(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateAddJobHistory }
