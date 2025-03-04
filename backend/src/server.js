const express = require('express');
const cors = require('cors');
require('./config/env');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRegistration');
const otherroutes = require('./routes/otherroutes');

const connectDatabase = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use("/api/v1/", userRoutes);
app.use("/types", otherroutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
