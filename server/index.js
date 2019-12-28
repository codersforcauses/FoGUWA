const express = require('express')
const consola = require('consola')

const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const { seedUsers, seedFlora, seedDB } = require('./seeder')
// // Seed data for empty collections
if (process.env.NODE_ENV !== 'production') {
  seedDB('users', seedUsers)
  seedDB('flora', seedFlora)
}

const middleware = require('./middleware')

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

  // Give middleware to express
  middleware(app)
  app.use(nuxt.render) // needs to be last

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
