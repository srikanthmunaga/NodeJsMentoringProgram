import { ErrorMessages } from "../../config/constants";
import { db } from "../database/database";
import { User } from "../mongomodels/user";

const getUsers = (req, res) => {
  db.users
    .findAll()
    .then(users => {
      if (!users.length) {
        res.send(ErrorMessages.NOUSERS);
      }
      res.send(users);
    })
    .catch(error => console.log("Error: ", error));
};
export const createMongoUser = (req, res) => {
  const { username, email, password } = req.body;

  User.create({ username, email, password }, (error, user) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(user);
  });
};

export const getMongoUsers = (req, res) => {
  User.find({}, (error, users) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(users);
  });
};

export const deleteMongoUser = (req, res) => {
  const { user_id } = req.params;

  User.findOneAndDelete({ _id: user_id }, (error, user) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(user);
  });
};

export { getUsers };
