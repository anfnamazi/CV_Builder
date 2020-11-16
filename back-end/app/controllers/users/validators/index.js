const { validateCreateUser } = require('./validateCreateUser')
const { validateDeleteUser } = require('./validateDeleteUser')
const { validateGetUser } = require('./validateGetUser')
const { validateUpdateUser } = require('./validateUpdateUser')
const { validateAddBaseInfo } = require('./validateAddBaseInfo')
const { validateAddBaseInfoUser } = require('./validateAddBaseInfoUser')
const { validateAddContactInfo } = require('./validateAddContactInfo')
const { validateAddContactInfoUser } = require('./validateAddContactInfoUser')
const { validateAddDoc } = require('./validateAddDoc')
const { validateAddDocUser } = require('./validateAddDocUser')
const { validateAddEducationHistory } = require('./validateAddEducationHistory')
const {
  validateAddEducationHistoryUser
} = require('./validateAddEducationHistoryUser')
const { validateAddJobHistory } = require('./validateAddJobHistory')
const { validateAddJobHistoryUser } = require('./validateAddJobHistoryUser')
const { validateAddProject } = require('./validateAddProject')
const { validateAddProjectUser } = require('./validateAddProjectUser')
const { validateAddResearch } = require('./validateAddResearch')
const { validateAddResearchUser } = require('./validateAddResearchUser')
const { validateAddSkill } = require('./validateAddSkill')
const { validateAddSkillUser } = require('./validateAddSkillUser')
const { validateAddHonor } = require('./validateAddHonor')
const { validateAddHonorUser } = require('./validateAddHonorUser')

module.exports = {
  validateAddBaseInfo,
  validateAddBaseInfoUser,
  validateAddContactInfo,
  validateAddContactInfoUser,
  validateCreateUser,
  validateDeleteUser,
  validateGetUser,
  validateUpdateUser,
  validateAddDoc,
  validateAddDocUser,
  validateAddEducationHistory,
  validateAddEducationHistoryUser,
  validateAddJobHistory,
  validateAddJobHistoryUser,
  validateAddProject,
  validateAddProjectUser,
  validateAddResearch,
  validateAddResearchUser,
  validateAddSkill,
  validateAddSkillUser,
  validateAddHonor,
  validateAddHonorUser
}
