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

const allowedOrigins = [
  'https://finacplus-full-stack-shivasaineela-shiva-sais-projects-cc9de988.vercel.app',
  'https://finacplus-full-stack-shivasaineelam.vercel.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
};

app.use(cors(corsOptions));  
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
