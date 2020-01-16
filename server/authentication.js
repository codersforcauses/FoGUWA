const expressjwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const axios = require('axios')
const consola = require('consola')

const getToken = req => {
  const tokenString = req.cookies['auth._token.auth0']
    ? req.cookies['auth._token.auth0']
    : req.headers.authorization
  const tokenMatch = /(?<=Bearer ).+/.exec(tokenString)
  return tokenMatch ? tokenMatch[0] : null
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
    consola.log(error)
  }
}

module.exports = { checkJwt, getToken, getUserInfo }
