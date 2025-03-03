const express = require('express');
require('./../config/env');

const connectDB = require('../config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
