const model = require('../../../models/educationHistory')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {String} userId - the user_id to add base info for
 */
const createEducationHistoryInDB = (
  {
    sectionEdu = '',
    fieldEdu = '',
    orientationEdu = '',
    uniType = '',
    uniName = '',
    averageEdu = '',
    uniCountry = '',
    uniProvince = '',
    uniCity = '',
    startEdu = '',
    endEdu = '',
    stillStudying = false
  },
  userId
) => {
  return new Promise((resolve, reject) => {
    const EducationHistory = new model({
      sectionEdu,
      fieldEdu,
      orientationEdu,
      uniType,
      uniName,
      averageEdu,
      uniCountry,
      uniProvince,
      uniCity,
      startEdu,
      endEdu,
      stillStudying,
      user: userId
    })
    EducationHistory.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      item = JSON.parse(JSON.stringify(item))
      resolve(item)
    })
  })
}

module.exports = { createEducationHistoryInDB }
