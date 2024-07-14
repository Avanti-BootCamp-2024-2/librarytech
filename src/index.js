const express = require('express');
const cors = require('cors');

const rotas = require('./rotas');
const app = express()

app.use(cors());
const port = 3000

app.use(cors())
app.use(express.json());

app.use(rotas);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})