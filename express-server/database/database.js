import Sequelize from "sequelize";
import dbConfig from "../config/config.json";
import Product from "../models/products";
import User from "../models/users";

const {
  dialect,
  username,
  password,
  host,
  port,
  database
} = dbConfig.development;
const url = `${dialect}://${username}:${password}@${host}:${port}/${database}`;
console.log(url);
const sequelize = new Sequelize(url);

export const db = {
  sequelize: sequelize,
  users: User(sequelize, Sequelize),
  products: Product(sequelize, Sequelize)
};
