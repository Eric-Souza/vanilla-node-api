const http = require('http');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./controllers/productController');

const server = http.createServer((req, res) => {
  // Finds all products
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res);
  }

  // Finds product by id
  else if (
    req.url.match(/\/api\/products\/([0-9a-z-A-Z]+)/) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/').pop();
    getProduct(req, res, id);
  }

  // Creates product
  else if (req.url === '/api/products' && req.method === 'POST') {
    createProduct(req, res);
  }

  // Updates product by id
  else if (
    req.url.match(/\/api\/products\/([0-9a-z-A-Z]+)/) &&
    req.method === 'PUT'
  ) {
    const id = req.url.split('/').pop();
    updateProduct(req, res, id);
  }

  // Deletes product by id
  else if (
    req.url.match(/\/api\/products\/([0-9a-z-A-Z]+)/) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/').pop();
    deleteProduct(req, res, id);
  }

  // Invalid route
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
