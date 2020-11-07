const model = require('../../../models/research')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {String} userId - the user_id to add base info for
 */
const createResearchInDB = (
  {
    researchType = 'کتاب',
    researchTitle = '',
    articleType = 'داخلی',
    publisher = '',
    researchHyperlink = '',
    researchMonth = '',
    researchYear = '',
    researchDescription = ''
  },
  userId
) => {
  return new Promise((resolve, reject) => {
    const Research = new model({
      researchType,
      researchTitle,
      articleType,
      publisher,
      researchHyperlink,
      researchMonth,
      researchYear,
      researchDescription,
      user: userId
    })
    Research.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      item = JSON.parse(JSON.stringify(item))
      resolve(item)
    })
  })
}

module.exports = { createResearchInDB }
