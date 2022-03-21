const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser')
router.use(bodyParser.json())

const v1 = require('./v1/router')
router.use('/v1', v1)

module.exports = router
