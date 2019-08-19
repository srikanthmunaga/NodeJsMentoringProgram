import { Router } from "express";
import passport from "passport";
import {
  getProduct,
  getProducts,
  getReviews,
  createProduct,
  getMongoProduct,
  getMongoProducts,
  getMongoReviews,
  createMongoProduct,
  deleteMongoProduct
} from "../controllers/products";
import * as cities from "../controllers/cities";
import { getUsers } from "../controllers/users";
import * as users from "../controllers/users";
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
router.route("/mongo/api/random").get(cities.getRandomCity);

router
  .route("/mongo/api/cities")
  .get(cities.getAllCities)
  .post(cities.createCity);

router
  .route("/mongo/api/cities/:city_id")
  .put(cities.updateCity)
  .delete(cities.deleteCity);

router
  .route("/mongo/api/users")
  .get(users.getMongoUsers)
  .post(users.createMongoUser);

router.route("/mongo/api/users/:user_id").delete(users.deleteMongoUser);

router
  .route("/mongo/api/products")
  .get(getMongoProducts)
  .post(createMongoProduct);

router
  .route("/mongo/api/products/:product_id")
  .get(getMongoProduct)
  .delete(deleteMongoProduct);

router.route("/mongo/api/products/:product_id/reviews").get(getMongoReviews);

export { router };
