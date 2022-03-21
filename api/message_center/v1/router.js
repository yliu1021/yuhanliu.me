const express = require('express')
const router = express.Router()
const crypto = require('crypto')

const hash = '747abb8d28db3b040f225d02830efdaf2697ba0265ce8f3a17239273488a91d828ca30b0a514b3bd4af196d6fd99f9c8d6c3175602ba02d7392898e05d067e09'

const data = new Map()

router.use((req, res, next) => {
  const auth = req.get('auth')
  if (!auth) {
    res.status(400).json({
      error: 'No auth found'
    })
    return
  }
  const authHash = crypto.createHash('sha512').update(auth).digest('hex')
  if (authHash !== hash) {
    res.status(403).json({
      error: 'Invalid auth'
    })
    return
  }
  next()
})

router.get('/', (req, res) => {
  res.json(Object.fromEntries(data))
})

router.post('/', (req, res) => {
  const key = req.body.key
  const value = req.body.value
  data.set(key, value)
  res.json({ success: true })
})

router.delete('/', (req, res) => {
  const key = req.body.key
  data.delete(key)
  res.json({ success: true })
})

module.exports = router
