const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const { mongoose } = require('./config/mongoose')
const { seedUsers, seedFlora, seedDB } = require('./seeder')
// Seed data for empty collections
if (process.env.NODE_ENV !== 'production') {
  seedDB(mongoose, 'users', seedUsers)
  seedDB(mongoose, 'flora', seedFlora)
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
