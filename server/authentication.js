const expressjwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const axios = require('axios')
const { findUserByEmail } = require('./controllers/users.js')

const getToken = req => {
  const tokenString = req.cookies['auth._token.auth0']
    ? req.cookies['auth._token.auth0']
    : req.headers.authorization
  const tokenMatcher = /(?<=Bearer ).+/
  return tokenMatcher.exec(tokenString)[0]
}

const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://fog-uwa.au.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  algorithms: [process.env.AUTH0_ALGORITHM],
  getToken
})

const getUserInfo = async token => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  try {
    return await axios.get('https://fog-uwa.au.auth0.com/userinfo', config)
  } catch (error) {
    return null
  }
}

const userAuthorised = async req => {
  const token = getToken(req)
  if (!token) return false
  const userInfo = await getUserInfo(token)
  if (!userInfo) return false
  const { email } = userInfo.data
  const adminObject = await findUserByEmail(email)
  return Object.keys(adminObject).length !== 0
}

const restrictAccess = async (req, res, next) => {
  const isAdmin = await userAuthorised(req)
  isAdmin ? next() : res.send('Access Denied')
}

module.exports = { checkJwt, getToken, getUserInfo, restrictAccess }
