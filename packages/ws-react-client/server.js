/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log('app is running on port', process.env.PORT || 3000));
