const model = require('../../../models/jobHistory')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {String} userId - the user_id to add base info for
 */
const createJobHistoryInDB = (
  {
    jobTitle = '',
    jobGroup = 'موسیقی',
    jobCenter = '',
    titleCenter = '',
    cooperateType = 'قراردادی تمام وقت',
    seniorLevel = 'تازه کار',
    jobCountry = '',
    jobProvince = '',
    jobCity = '',
    startJobMonth = '',
    startJobYear = '',
    endJobMonth = '',
    endJobYear = '',
    stillWorking = false,
    income = '',
    number = '',
    jobDescription = ''
  },
  userId
) => {
  return new Promise((resolve, reject) => {
    const jobHistory = new model({
      jobTitle,
      jobGroup,
      jobCenter,
      titleCenter,
      cooperateType,
      seniorLevel,
      jobCountry,
      jobProvince,
      jobCity,
      startJobMonth,
      startJobYear,
      endJobMonth,
      endJobYear,
      stillWorking,
      income,
      number,
      jobDescription,
      user: userId
    })
    jobHistory.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      item = JSON.parse(JSON.stringify(item))
      resolve(item)
    })
  })
}

module.exports = { createJobHistoryInDB }
