const express = require('express');
const cors = require('cors');
require('./config/env');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRegistration');
const otherroutes = require('./routes/otherroutes');

const connectDatabase = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.FRONTEND_URL)
connectDatabase();
const corsOptions = {
  origin: 'https://finacplus-full-stack-shivasaineelam.vercel.app',
  credentials: true,  
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('server working fine');
});

app.use("/api/v1/", userRoutes);
app.use("/types", otherroutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
