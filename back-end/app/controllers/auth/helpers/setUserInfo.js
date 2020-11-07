/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = (req = {}) => {
  return new Promise((resolve) => {
    let user = {
      _id: req._id,
      phone: req.phone
    }
    // Adds verification for testing purposes
    if (process.env.NODE_ENV !== 'production') {
      user = {
        ...user
      }
    }
    resolve(user)
  })
}

module.exports = { setUserInfo }
