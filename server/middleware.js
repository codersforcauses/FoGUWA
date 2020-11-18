const bodyParser = require('body-parser')
const FloraRouter = require('./routes/flora')
const UsersRouter = require('./routes/users')
const ImagesRouter = require('./routes/images')

module.exports = app => {
  app.use(bodyParser.json({limit: '500mb'}))
  app.use('/api', FloraRouter)
  app.use('/api', UsersRouter)
  app.use('/api', ImagesRouter)

  app.use((req, res, next) => {
    if (res.body !== undefined) {
      res.body = {
        status: 200,
        data: res.body
      }
      res.json(res.body)
    } else {
      next()
    }
  })

  // Handle error - 404, 500, etc.
  // http://expressjs.com/en/guide/error-handling.html
  app.use((err, req, res, next) => {
    res.body = {
      status: err.status,
      message: err.message
    }
    res.status(err.status || 500)
    res.json(res.body)
  })
}
