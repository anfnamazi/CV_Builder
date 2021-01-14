const User = require('../../models/user')
const ContactInfo = require('../../models/contactInfo')
const UserBaseInfo = require('../../models/userBaseInfo')
const EducationHistory = require('../../models/educationHistory')
const JobHistorie = require('../../models/jobHistory')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const _ = require('lodash')
const { Parser, parse } = require('json2csv')
const moment = require('jalali-moment')
const fs = require('fs')
const archiver = require('archiver')
const path = require('path')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getZipAttachment = async (req, res) => {
  try {
    // let userId = req.user.id
    let id = req.params.id
    // req = matchedData(req)
    // id = id || userId
    // id = await isIDGood(id)
    let item = await User.findOne({ _id: id }).populate([
      'userBaseInfo',
      'contactInfo',
      'educationHistories',
      'jobHistories',
      'researchs',
      'projects',
      'docs',
      'languages',
      'experiments',
      'moneyAccounts',
      'honors'
    ])

    const fileNames = []
    if (item.userBaseInfo && item.userBaseInfo.eduCertif.file) {
      fileNames.push(
        {
          file: item.userBaseInfo.eduCertif.file,
          fileType: item.userBaseInfo.eduCertif.fileType
        },
        {
          file: item.userBaseInfo.nationalCard.file,
          fileType: item.userBaseInfo.nationalCard.fileType
        },
        {
          file: item.userBaseInfo.image.file,
          fileType: item.userBaseInfo.image.fileType
        }
      )
    }
    const zipFile = path.join(__dirname, `../../../uploads/zip/${id}.zip`)
    const output = fs.createWriteStream(zipFile)
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    })

    archive.pipe(output)

    fileNames.map((fileName) => {
      const file = path.join(__dirname, `../../../uploads/${fileName.file}`)
      archive.append(fs.createReadStream(file), {
        name: `${fileName.file}.${fileName.fileType}`
      })
    })

    output.on('close', function () {
      console.log(archive.pointer() + ' total bytes')
      console.log(
        'archiver has been finalized and the output file descriptor has closed.'
      )
      res.status(200).download(zipFile, `resume_${item.phone}.zip`)
    })

    archive.finalize()
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getZipAttachment }
