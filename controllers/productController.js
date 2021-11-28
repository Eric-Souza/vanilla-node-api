const Product = require('../models/productModel');

const { getPostData } = require('../utils');

// GET api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log('Error while finding all products', error);
  }
}

// GET api/products/:id
async function getProduct(req, res, id) {
  try {
    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product not found' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(foundProduct));
  } catch (error) {
    console.log('Error while finding product by id', error);
  }
}

// POST api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);

    const product = {
      title,
      description,
      price,
    };

    const newProduct = await Product.create(product);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log('Error while creating new product', error);
  }
}

// PUT api/products/:id
async function updateProduct(req, res, id) {
  try {
    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product not found' }));
    }

    const body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);

    const productData = {
      title: title || foundProduct.title,
      description: description || foundProduct.description,
      price: price || foundProduct.price,
    };

    const updatedProduct = await Product.update(id, productData);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(updatedProduct));
  } catch (error) {
    console.log('Error while creating new product', error);
  }
}

// DELETE api/products/:id
async function deleteProduct(req, res, id) {
  try {
    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product not found' }));
    }

    await Product.remove(id);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ message: `Product with id ${id} removed successfully` })
    );
  } catch (error) {
    console.log('Error while finding product by id', error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
