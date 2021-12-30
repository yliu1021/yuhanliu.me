const express = require('express')
const jsCAS = require('./js_cas')
const ocamlCASV2 = express.Router()

ocamlCASV2.get('/', function (req, res) {
  res.json({
    status: 'online'
  })
})

ocamlCASV2.post('/', function (req, res) {
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
  const ans = JSON.parse(jsCAS.eval(query))
  res.json(ans)
})

ocamlCASV2.ws('/ws', (ws, req) => {
  ws.on('message', query => {
    // we parse and stringify to remove redundant whitespace
    const ans = JSON.parse(jsCAS.eval(query))
    ws.send(JSON.stringify(ans))
  })
})

module.exports = ocamlCASV2
