import usersData from "./../../data/users.json";
const getUsers = (req, res) => {
  res.send(usersData.data);
};

export { getUsers };
