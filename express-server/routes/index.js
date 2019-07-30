import { Router } from "express";
import passport from "passport";
import {
  getProduct,
  getProducts,
  getReviews,
  createProduct
} from "../controllers/products";

import { getUsers } from "../controllers/users";
import { verifyJWT } from "../middlewares/verifyJWT";
import { useStrategies } from "../config/strategies";
import { auth, passportAuth } from "../controllers/auth";

useStrategies();

const router = Router();

router.route("/api/*").get(verifyJWT);
router.route("/api/users").get(getUsers);

router
  .route("/api/products")
  .get(getProducts)
  .post(createProduct);

router.route("/api/products/:product_id").get(getProduct);

router.route("/api/products/:product_id/reviews").get(getReviews);

router.route("/auth").post(auth);

router.route("/auth/local").post(passportAuth("local"));

router.route("/auth/facebook").get(passport.authenticate("facebook"));

router.route("/auth/facebook/callback").get(passportAuth("facebook"));

router.route("/auth/github").get(passport.authenticate("github"));

router.route("/auth/github/callback").get(passportAuth("github"));

router
  .route("/auth/google")
  .get(passport.authenticate("google", { scope: ["email", "profile"] }));

router.route("/auth/google/callback").get(passportAuth("google"));

export { router };
