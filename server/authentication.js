const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://codersforcauses.au.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: '<API_IDENTIFIER>',
  issuer: `https://codersforcauses.au.auth0.com/`,
  algorithms: ['RS256']
})

module.exports = { checkJwt }
