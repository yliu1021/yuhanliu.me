const express = require('express')
const router = express.Router()
const crypto = require('crypto')

const userIPs = new Map()

router.get('/new', (req, res) => {
  const userToken = crypto.randomBytes(16).toString('hex')
  userIPs.set(userToken, {})
  res.json({
    token: userToken
  })
})

router.post('/', (req, res) => {
  const userToken = req.get('auth')
  if (!userToken) {
    res.status(400).json({
      error: 'No auth token found'
    })
    return
  }
  if (!userIPs.has(userToken)) {
    res.status(403).json({
      error: 'Invalid auth token. Please generate a new one.'
    })
    return
  }
  const name = req.body.name
  if (!name) {
    res.status(400).json({
      error: 'No name specified.'
    })
    return
  }
  userIPs.get(userToken)[name] = req.ips[0] || req.ip
  res.json({
    success: true
  })
})

router.get('/', (req, res) => {
  const userToken = req.get('auth')
  if (!userToken) {
    res.status(400).json({
      error: 'No auth token found'
    })
    return
  }
  if (!userIPs.has(userToken)) {
    res.status(403).json({
      error: 'Invalid auth token. Please generate a new one.'
    })
    return
  }
  const ips = userIPs.get(userToken)
  res.json(ips)
})

module.exports = router
