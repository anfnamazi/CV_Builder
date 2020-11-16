const { createItemInDb } = require('./createItemInDb')
const { createBaseInfoInDB } = require('./createBaseInfoInDB')
const { getUserBaseInfoByUserId } = require('./getUserBaseInfoByUserId')
const { getUserBaseInfoById } = require('./getUserBaseInfoById')
const { createContactInfoInDB } = require('./createContactInfoInDB')
const { addFileNameToReq } = require('./addFileNameToReq')
const { createDocInDB } = require('./createDocInDB')
const { createEducationHistoryInDB } = require('./createEducationHistoryInDB')
const { createJobHistoryInDB } = require('./createJobHistoryInDB')
const { createProjectInDB } = require('./createProjectInDB')
const { createResearchInDB } = require('./createResearchInDB')
const { createSkillInDB } = require('./createSkillInDB')
const { createHonorInDB } = require('./createHonorInDB')

module.exports = {
  createItemInDb,
  createBaseInfoInDB,
  getUserBaseInfoByUserId,
  getUserBaseInfoById,
  createContactInfoInDB,
  addFileNameToReq,
  createDocInDB,
  createEducationHistoryInDB,
  createJobHistoryInDB,
  createProjectInDB,
  createResearchInDB,
  createSkillInDB,
  createHonorInDB
}
