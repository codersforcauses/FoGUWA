const expressjwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

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

module.exports = { checkJwt }
