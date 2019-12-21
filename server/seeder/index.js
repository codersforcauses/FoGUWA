const mongoose = require('mongoose')
const consola = require('consola')
const User = mongoose.model('User')
const Flora = mongoose.model('Flora')
const floraSeedData = require('./floraSeeds')
const userSeedData = require('./userSeeds')

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

const seedUsers = async () => {
  const userSeedObj = JSON.parse(userSeedData)
  const userPromises = userSeedObj.map(userSeed => addUser(userSeed))
  const users = await Promise.all(userPromises)
  consola.success(`Seeded ${users.length} users`)
}

const seedFlora = async () => {
  const floraSeedObj = JSON.parse(floraSeedData)
  const floraPromises = floraSeedObj.map(floraSeed => addFlora(floraSeed))
  const flora = await Promise.all(floraPromises)
  consola.success(`Seeded ${flora.length} plants`)
}

module.exports = { addFlora, addUser, seedFlora, seedUsers }
