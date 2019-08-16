import { ErrorMessages } from "../../config/constants";
import { db } from "../database/database";

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

export { getUsers };
