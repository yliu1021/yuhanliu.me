const express = require('express')
const jsCAS = require('./js_cas')
const ocamlCASV1 = express.Router()

ocamlCASV1.get('/', function (req, res) {
  res.json({
    status: 'online'
  })
})

ocamlCASV1.post('/', function (req, res) {
  const b = req.body
  if (!('query' in b)) {
    res.status(400)
    res.json({
      error: 'query not found'
    })
    return
  }
  const query = b.query
  if (typeof query !== 'string' && !(query instanceof String)) {
    res.status(400)
    res.json({
      error: 'query is not a string'
    })
  }
  const ans = jsCAS.eval(query)
  res.json({
    query: query,
    response: ans
  })
})

ocamlCASV1.ws('/ws', (ws, req) => {
  ws.on('message', query => {
    const ans = jsCAS.eval(query)
    ws.send(JSON.stringify({
      query: query,
      response: ans
    }))
  })
})

module.exports = ocamlCASV1
