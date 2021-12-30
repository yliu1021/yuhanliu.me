const express = require('express')
const expressWs = require('express-ws')
const app = express()
expressWs(app)

const port = process.env.PORT || 8080

// Public website
app.use(express.static('public'))
app.use(express.static('icons'))

// Backend APIs
const apiRouter = require('./api/router')
app.use('/api', apiRouter)

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`)
})
