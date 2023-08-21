var express = require('express');
var router = express.Router();
const axios = require('axios');
const config = require('../config.js');

async function handleCDNProxy(req, res) {
  const decodedPath = decodeURIComponent(req.path);
  const newUrl = config.jsdURL + decodedPath;
  // console.log(newUrl);
  try {
    const response = await axios.get(newUrl, {});
    res.status(response.status).send(response.data);
  } catch (err) {
    res.json({
      code: '0000',
      msg: '反代出错了',
      data: null,
    });
  }
}

// 处理反代
router.get('/*', handleCDNProxy);

module.exports = router;
