const expressjwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const getToken = req => {
  const tokenString = req.cookies['auth._token.auth0']
    ? req.cookies['auth._token.auth0']
    : req.headers.authorization
  const tokenMatcher = /Bearer (?<token>[a-zA-Z0-9-_.]+)/
  return tokenMatcher.exec(tokenString).groups.token
}

const setUser = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://fog-uwa.au.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_DOMAIN,
  algorithms: [process.env.AUTH0_ALGORITHM],
  getToken
})

module.exports = { setUser, getToken }
