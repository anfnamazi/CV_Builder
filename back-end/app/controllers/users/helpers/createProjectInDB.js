const model = require('../../../models/project')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param {String} userId - the user_id to add base info for
 */
const createProjectInDB = (
  {
    projectTitle = '',
    projectEmployer = '',
    projectHyperlink = '',
    startProjectMonth = '',
    startProjectYear = '',
    endProjectMonth = '',
    endProjectYear = '',
    projectDescription = ''
  },
  userId
) => {
  return new Promise((resolve, reject) => {
    const Project = new model({
      projectTitle,
      projectEmployer,
      projectHyperlink,
      startProjectMonth,
      startProjectYear,
      endProjectMonth,
      endProjectYear,
      projectDescription,
      user: userId
    })
    Project.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      item = JSON.parse(JSON.stringify(item))
      resolve(item)
    })
  })
}

module.exports = { createProjectInDB }
