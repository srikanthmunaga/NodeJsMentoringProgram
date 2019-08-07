import { ErrorMessages } from "../../config/constants";
import { db } from "../database/database";

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

export { getProduct, getProducts, getReviews, createProduct };
