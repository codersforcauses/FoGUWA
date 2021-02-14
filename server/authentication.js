const expressjwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const axios = require('axios')
const consola = require('consola')
const { findUserByEmail } = require('./controllers/users.js')

const getToken = req => {
  const tokenString = req.cookies['auth._token.auth0']
    ? req.cookies['auth._token.auth0']
    : req.headers.authorization
  const tokenMatch = /(?<=Bearer ).+/.exec(tokenString)
  return (tokenMatch || []).length > 0 ? tokenMatch[0] : null
}

const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  algorithms: [process.env.AUTH0_ALGORITHM],
  getToken
})

const getUserInfo = token => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`, config)
}

const findUser = async req => {
  const token = getToken(req)
  if (!token) throw new Error('Error retrieving token')
  const userInfo = await getUserInfo(token)
  const { email } = userInfo.data
  const adminObject = await findUserByEmail(email) // Returns null on non admin
  return adminObject || null
}

const userIsAdmin = async req => {
  try {
    const adminObject = await findUser(req)
    return !!adminObject
  } catch (error) {
    consola.log(error)
    return false
  }
}

const restrictAccess = async (req, res, next) => {
  const isAdmin = await userIsAdmin(req)
  isAdmin ? next() : res.status(401).json({ message: 'Access Denied' })
}

module.exports = { checkJwt, getToken, getUserInfo, restrictAccess, findUser, userIsAdmin }
