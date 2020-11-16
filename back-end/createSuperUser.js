require('dotenv-safe').config()
const User = require('./app/models/user')
const initMongo = require('./config/mongo')
async function saveItem(item) {
  let saved = await item.save()
  console.log(saved)
}
initMongo()
let item = new User({
  phone: '09190000000',
  email: 'admin@mySite.com',
  password: '123456',
  role: 'admin',
  verified: true
})
// console.log(item)
// saveItem(item)
item.save((res, err) => {
  console.log(res)
  console.log(err)
})
