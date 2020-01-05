const expressjwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://fog-uwa.au.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_DOMAIN,
  algorithms: [process.env.AUTH0_ALGORITHM]
})

const AuthMiddleware = expressjwt({
  secret: process.env.AUTH0_SECRET,
  algorithms: [process.env.AUTH0_ALGORITHM],
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_DOMAIN,
  getToken: req => {
    return req.cookies['auth._token.auth0'] || null
  }
})

module.exports = { checkJwt, AuthMiddleware }
