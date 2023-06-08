const path = require('path');

module.exports = {
  entry: './functions/openaiapi_function.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'functions'),
  },
  target: 'node',
};