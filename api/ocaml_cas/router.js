const express = require('express')
const ocamlCAS = express.Router()

const bodyParser = require('body-parser')
ocamlCAS.use(bodyParser.json())

const ocamlCASV1 = require('./v1/router')
ocamlCAS.use('/v1', ocamlCASV1)

const ocamlCASV2 = require('./v2/router')
ocamlCAS.use('/v2', ocamlCASV2)

module.exports = ocamlCAS
