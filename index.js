const express = require('express');
const app = express();
const http = require("http");
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
const cors = require('cors');
const fs=require('fs')
// set up port
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '15MB' }))
app.use(cors());
const axios = require("axios");

// add routes   
const router = require('./routes/router.js');
app.use(router);
// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
