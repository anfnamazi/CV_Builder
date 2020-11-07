/**
 * req.image = req.file.filename if possible
 * @param {object} req - request object
 */
const addFileNameToReq = (req, key = '') => {
  return new Promise((resolve, reject) => {
    try {
      req[key] = req.file.filename
      resolve(req)
    } catch (err) {
      resolve(req)
    }
  })
}

module.exports = { addFileNameToReq }
