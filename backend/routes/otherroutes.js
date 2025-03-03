const express = require('express');
const router = express.Router();

router.get('/genders', (req, res) => {
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
  res.json({ genders: genderOptions });
});

module.exports = router;
