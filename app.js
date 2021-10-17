const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static("public"))
app.use(express.static("icons"))

app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on port ${port}`)
})
