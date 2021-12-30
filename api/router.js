const express = require('express')
const router = express.Router()

const ocamlCAS = require('./ocaml_cas/router')
router.use('/ocaml_cas', ocamlCAS)

const deviceTracker = require('./device_tracker/router')
router.use('/device_tracker', deviceTracker)

router.get('/', (req, res) => {
  res.json({
    api: 'online'
  })
})

module.exports = router
