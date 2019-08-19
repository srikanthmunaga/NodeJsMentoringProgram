import { ErrorMessages } from "../../config/constants";
import { db } from "../database/database";
import { Product } from "../mongomodels/product";
const getProduct = (req, res) => {
  db.products
    .findByPk(req.params.product_id)
    .then(product => {
      if (!product) {
        res.send(ErrorMessages.NOPRODUCT);
      }
      res.send(product);
    })
    .catch(error => console.log("Error: ", error));
};

const getProducts = (req, res) => {
  db.products
    .findAll()
    .then(products => res.send(products))
    .catch(error => res.send(ErrorMessages.NOPRODUCTS));
};

const createProduct = (req, res) => {
  const { title, price, id, reviews } = req.body;
  db.products
    .create({ title, price, id, reviews })
    .then(product => res.json(product))
    .catch(error => console.log("Error:", error));
};

const getReviews = (req, res) => {
  db.products
    .findByPk(req.params.product_id)
    .then(product => {
      if (!product) {
        res.send(ErrorMessages.NOPRODUCT);
      }
      if (!product["reviews"]) {
        res.send(ErrorMessages.NOREVIEWS);
      }

      res.json(product["reviews"]);
    })
    .catch(error => console.log("Error: ", error));
};

const getMongoProducts = (req, res) => {
  Product.find({}, (error, products) => {
    if (error) {
      console.error("Error", error);
    }
    res.send(products);
  });
};

const createMongoProduct = (req, res) => {
  const { id, title, price, reviews } = req.body;

  Product.create({ id, title, price, reviews }, (error, product) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(product);
  });
};

const getMongoProduct = (req, res) => {
  const { product_id } = req.params;

  Product.findOne({ id: product_id }, (error, product) => {
    if (error) {
      console.error("Error", error);
    }

    if (!product) {
      res.send(ErrorMessages.NOPRODUCT);
      return;
    }

    res.send(product);
  });
};

const getMongoReviews = (req, res) => {
  const { product_id } = req.params;

  Product.findOne({ id: product_id }, (error, product) => {
    if (error) {
      console.error("Error", error);
    }

    if (!product) {
      res.send(ErrorMessages.NOPRODUCT);
      return;
    }

    if (!product["reviews"]) {
      res.send(ErrorMessages.NOREVIEWS);
      return;
    }

    res.send(product["reviews"]);
  });
};

const deleteMongoProduct = (req, res) => {
  const { product_id } = req.params;

  Product.findOneAndDelete({ id: product_id }, (error, product) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(product);
  });
};

export {
  getProduct,
  getProducts,
  getReviews,
  createProduct,
  getMongoProduct,
  getMongoProducts,
  getMongoReviews,
  createMongoProduct,
  deleteMongoProduct
};
