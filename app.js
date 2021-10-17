const express = require('express');
const app = express();

const port = 8000;

app.use(express.static("public"))
app.use(express.static("icons"))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
