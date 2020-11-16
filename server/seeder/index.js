const fs = require('fs')
const consola = require('consola')
const { addUser } = require('../controllers/users')
const { addFlora } = require('../controllers/flora')
const { addImage } = require('../controllers/image')

const parseJSON = JSONfile => {
  const rawdata = fs.readFileSync(JSONfile)
  return JSON.parse(rawdata)
}

const parseImages = plant => {
  plant.images.forEach(image => {
    image.data = 'data:image/jpeg;base64,' + fs.readFileSync('server/seeder/plants/' + image.src, 'base64');
  })
  return plant
}

const seedFlora = async () => {
  const plantData = parseJSON('server/seeder/floraSeeds.json')
  for (const plant of plantData) {
    parseImages(plant)
    const images = await Promise.all(plant.images.map(image => addImage(image)))
    plant.images = images
  }
  const promises = plantData.map(plant => addFlora(plant))
  const seedResult = await Promise.all(promises)
  consola.success(`Seeded ${seedResult.length} plants`)
}

const seedUsers = async () => {
  const userData = parseJSON('server/seeder/userSeeds.json')
  const promises = userData.map(user => addUser(user))
  const seedResult = await Promise.all(promises)
  consola.success(`Seeded ${seedResult.length} users`)
}

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

module.exports = { seedFlora, seedUsers, seedDB }
