const bodyParser = require('body-parser')
const FloraRouter = require('./routes/flora')
const UsersRouter = require('./routes/users')
const LoginRouter = require('./routes/login')

module.exports = app => {
  app.use(bodyParser.json())
  app.use('/api', FloraRouter)
  app.use('/api', UsersRouter)
  app.use('/', LoginRouter)

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
