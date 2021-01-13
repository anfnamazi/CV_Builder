const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { createExperimentInDB } = require('./helpers')
const model = require('../../models/experiment')
/**
 * Create contact item for user function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createExperimentUser = async (req, res) => {
  try {
    let user = req.user
    let items = []
    const resultDelete = await model.deleteMany({ user: user._id })
    if (resultDelete) {
      user.experiments = []
      let files = undefined
      if (req.files) {
        files = req.files
      }
      const doc = JSON.parse(req.body.document)
      const edusCount = doc.experimentForm.length
      doc.experimentForm.map(async (jobField, index) => {
        if (jobField.Name === '') {
          return res.status(200).json({})
        }
        req = matchedData(req)
        if (files && files.cert) {
          files.cert.map((cert) => {
            if (cert.originalname === jobField.Name) {
              jobField.cert = {
                file: cert.filename,
                fileType: cert.mimetype.split('/')[1],
                name: 'image_' + cert.originalname
              }
            }
          })
        }

        const item = await createExperimentInDB(jobField, user._id)
        user.experiments.push(item._id)

        items.push(item)
        if (edusCount === items.length) {
          await user.save()
          res.status(201).json({ 'new items': items })
        }
      })
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createExperimentUser }
