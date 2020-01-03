const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://<AUTH0_DOMAIN>/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: '<API_IDENTIFIER>',
  issuer: `https://<AUTH0_DOMAIN>/`,
  algorithms: ['RS256']
})

module.exports = { checkJwt }
