const { createUser } = require('./createUser')
const { deleteUser } = require('./deleteUser')
const { getUser } = require('./getUser')
const { getUsers } = require('./getUsers')
const { updateUser } = require('./updateUser')
const { createBaseInfo } = require('./createBaseInfo')
const { getUserBaseInfo } = require('./getUserBaseInfo')
const { createContactInfoUser } = require('./createContactInfoUser')
const { createBaseInfoUser } = require('./createBaseInfoUser')
const { createDocUser } = require('./createDocUser')
const { updateDocUser } = require('./updateDocUser')
const { createEducationHistoryUser } = require('./createEducationHistoryUser')
const { updateEducationHistoryUser } = require('./updateEducationHistoryUser')
const { createJobHistoryUser } = require('./createJobHistoryUser')
const { updateJobHistoryUser } = require('./updateJobHistoryUser')
const { createResearchUser } = require('./createResearchUser')
const { createProjectUser } = require('./createProjectUser')
const { updateSimpleItem } = require('./updateSimpleItem')

module.exports = {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  createBaseInfo,
  getUserBaseInfo,
  createContactInfoUser,
  createBaseInfoUser,
  createDocUser,
  updateDocUser,
  createEducationHistoryUser,
  updateEducationHistoryUser,
  createJobHistoryUser,
  updateJobHistoryUser,
  createResearchUser,
  createProjectUser,
  updateSimpleItem
}