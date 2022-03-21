const express = require('express')
const router = express.Router()

const ocamlCAS = require('./ocaml_cas/router')
router.use('/ocaml_cas', ocamlCAS)

const messageCenter = require('./message_center/router')
router.use('/message_center', messageCenter)

router.get('/', (req, res) => {
  res.json({
    api: 'online'
  })
})

module.exports = router
