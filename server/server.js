require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())

app.get('/tags', (_req, res) => {
  res.send(["test1","test2","test3"]);
})

app.listen(process.env.PORT, () => console.log(`Server alive on port ${process.env.PORT}`));