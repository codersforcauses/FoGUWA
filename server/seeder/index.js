const fs = require('fs')
const mongoose = require('mongoose')
const consola = require('consola')
const User = mongoose.model('User')
const Flora = mongoose.model('Flora')

const addUser = userObject => {
  return new Promise((resolve, reject) => {
    const user = new User()
    user.name.first = userObject.name.first
    user.name.last = userObject.name.last
    user.email = userObject.email
    user.password = userObject.password
    user.save(err => {
      if (err) {
        reject(err)
      }
    })
    resolve(user)
  })
}

const addFlora = floraObject => {
  return new Promise((resolve, reject) => {
    const flora = new Flora()
    flora.name = floraObject.name
    flora.scientificName = floraObject.scientificName
    flora.description = floraObject.description
    flora.icon = floraObject.icon
    flora.instances = floraObject.instances
    flora.save(err => {
      if (err) {
        reject(err)
      }
    })
    resolve(flora)
  })
}

const parseJSON = JSONfile => {
  const rawdata = fs.readFileSync(JSONfile)
  const data = JSON.parse(rawdata)
  return data
}

const seedData = async (dataJSON, promiseFunction, seedName) => {
  const seedObj = parseJSON(dataJSON)
  const promises = seedObj.map(seed => promiseFunction(seed))
  const seedResult = await Promise.all(promises)
  consola.success(`Seeded ${seedResult.length} ${seedName}`)
}

const seedUsers = () =>
  seedData('server/seeder/userSeeds.json', addUser, 'users')

const seedFlora = () =>
  seedData('server/seeder/floraSeeds.json', addFlora, 'plants')

module.exports = { addFlora, addUser, seedFlora, seedUsers }
