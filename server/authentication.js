const expressjwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const axios = require('axios')
const { findUserByEmail } = require('./controllers/users.js')

const getToken = req => {
  const tokenString = req.cookies['auth._token.auth0']
    ? req.cookies['auth._token.auth0']
    : req.headers.authorization
  const tokenMatch = /(?<=Bearer ).+/.exec(tokenString)
  return (tokenMatch || {}).length > 0 ? tokenMatch[0] : null
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

const getUserInfo = token => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get('https://fog-uwa.au.auth0.com/userinfo', config)
}

const findUser = async req => {
  const token = getToken(req)
  if (!token) throw new Error('Error retrieving token')
  try {
    const userInfo = await getUserInfo(token)
    const { email } = userInfo.data
    const adminObject = await findUserByEmail(email)
    const { name, _id } = adminObject
    return { name, _id } || null
  } catch (error) {
    if(error.response.statusText === 'Unauthorized') throw new Error('User is unauthrorized')
  }
}

const userIsAdmin = async req => {
  try {
    const adminObject = await findUser(req)
    return !!adminObject
  } catch (error) {
    return false
  }
}

const restrictAccess = async (req, res, next) => {
  const isAdmin = await userIsAdmin(req)
  isAdmin ? next() : res.send('Access Denied')
}

module.exports = { checkJwt, getToken, getUserInfo, restrictAccess, findUser, userIsAdmin }
