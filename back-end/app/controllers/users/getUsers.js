const User = require('../../models/user')
const _ = require('lodash')
const { handleError } = require('../../middleware/utils')
const { getItems, checkQueryString } = require('../../middleware/db')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUsers = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    let usersResult = await getItems(req, User, query)
    _.remove(usersResult.docs, {
      role: 'admin'
    })
    console.log(usersResult)
    res.status(200).json(usersResult)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getUsers }
