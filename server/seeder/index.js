const fs = require('fs')
const consola = require('consola')
const { addUser } = require('../controllers/users')
const { addFlora } = require('../controllers/flora')

const parseJSON = JSONfile => {
  const rawdata = fs.readFileSync(JSONfile)
  return JSON.parse(rawdata)
}

const seedFactory = async (dataJSON, promiseFunction, seedName) => {
  const seedObj = parseJSON(dataJSON)
  const promises = seedObj.map(seed => promiseFunction(seed))
  const seedResult = await Promise.all(promises)
  consola.success(`Seeded ${seedResult.length} ${seedName}`)
}

const seedUsers = () =>
  seedFactory('server/seeder/userSeeds.json', addUser, 'users')

const seedFlora = () =>
  seedFactory('server/seeder/floraSeeds.json', addFlora, 'plants')

// Uses a provided function to seed data into the specified collection
const seedDB = (dbconnection, collectionName, factory) => {
  dbconnection.collection(collectionName).countDocuments((err, count) => {
    if (err)
      consola.error(`Error getting ${collectionName} collection count: ${err}`)
    else if (count === 0) {
      consola.info(`Seeding ${collectionName} collection`)
      factory()
    }
  })
}

module.exports = { addFlora, addUser, seedFlora, seedUsers, seedDB }
