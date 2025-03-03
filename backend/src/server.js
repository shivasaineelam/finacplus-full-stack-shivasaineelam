const express = require('express');
require('./config/env');
const cookieParser = require('cookie-parser'); 
const userRoutes=require('./routes/userRegistration')

const connectDatabase = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDatabase();

app.use(express.json());
app.use(cookieParser()); 


app.get('/', (req, res) => {
  res.send('hello world');
});
app.use("/api/v1/",userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
