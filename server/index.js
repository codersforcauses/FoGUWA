const express = require('express')
const consola = require('consola')

const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const { mongoose } = require('./config/mongoose')
const { seedUsers, seedFlora } = require('./seeder')
// // Seed data for empty collections
if (process.env.NODE_ENV !== 'production') {
  mongoose.collection('users').countDocuments((err, count) => {
    if (err) consola.error(`Error getting user collection count: ${err}`)
    else if (count === 0) {
      consola.info('Seeding Users collection')
      seedUsers()
    }
  })

  mongoose.collection('flora').countDocuments((err, count) => {
    if (err) consola.error(`Error getting flora collection count: ${err}`)
    else if (count === 0) {
      consola.info('Seeding Flora collection')
      seedFlora()
    }
  })
}

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
