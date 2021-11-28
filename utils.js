const fs = require('fs');

// Writes new products in data/products.json
function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log('Error while writing file', err);
    }
  });
}

// Gets request data
function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      console.log('Error while getting request body data');
      reject(error);
    }
  });
}

module.exports = { writeDataToFile, getPostData };
