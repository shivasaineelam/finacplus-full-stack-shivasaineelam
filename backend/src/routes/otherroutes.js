  const express = require('express');
  const ResponseFormatter = require('../responder/responseFormatter');
  const router = express.Router();

  router.get('/genders', (req, res) => {
    const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
    ResponseFormatter.operationSuccess(res,genderOptions,"gender fetched successfully",200);
  });

  module.exports = router;
