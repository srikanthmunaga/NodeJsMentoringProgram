import { Router } from "express";
import {
  getProduct,
  getProducts,
  getReviews,
  createProduct
} from "../controllers/products";

import { getUsers } from "../controllers/users";
const router = Router();

router.route("/api/users").get(getUsers);

router
  .route("/api/products")
  .get(getProducts)
  .post(createProduct);

router.route("/api/products/:product_id").get(getProduct);

router.route("/api/products/:product_id/reviews").get(getReviews);

export { router };
