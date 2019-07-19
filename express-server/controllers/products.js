import productsData from "./../../data/product.json";

const getProduct = (req, res) => {
  const id = req.params.product_id;
  let product = productsData.data.filter(item => {
    return item.id == id;
  });
  res.send(product.length ? product : []);
};

const getProducts = (req, res) => {
  res.send(productsData);
};

const createProduct = (req, res) => {
  const product = req.body;
  productsData.data.push(product);
  res.send(product);
};

const getReviews = (req, res) => {
  const id = req.params.product_id;
  let product = productsData.data.filter(item => {
    return item.id == id;
  });
  res.send(product.length ? product[0].reviews : []);
};

export { getProduct, getProducts, getReviews, createProduct };
