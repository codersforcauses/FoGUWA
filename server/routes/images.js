const express = require('express')
const { checkJwt, restrictAccess } = require('../authentication.js')
const { getUploadLink } = require('../controllers/images')
const router = express.Router()

router.post('/image', checkJwt, restrictAccess, async (req, res) => {
  const { contentType, fileName } = req.body
  try {
    const signedData = await getUploadLink(fileName, contentType)
    res.status(200).json({ url: signedData, key: `${fileName}` })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
