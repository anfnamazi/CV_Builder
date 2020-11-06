const User = require('../../models/userBaseInfo')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const { getItem } = require('../../middleware/db')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUserBaseInfo = async (req, res) => {
  try {
    req = matchedData(req)
    console.log(req)
    // console.log(req)
    // const id = await isIDGood(req.id)
    // res.status(200).json(await getItem(id, User))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getUserBaseInfo }
