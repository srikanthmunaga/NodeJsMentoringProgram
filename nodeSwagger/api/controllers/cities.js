var City = require("./../../../express-server/mongomodels/city").City;

const getRandomCity = (req, res) => {
  City.find({}, (error, cities) => {
    if (error) {
      console.error("Error", error);
    }

    if (cities.length) {
      const randomCityNumber = Math.round(Math.random() * (cities.length - 1));
      res.send(cities[randomCityNumber]);
    }
  });
};

const getAllCities = (req, res) => {
  City.find({}, (error, cities) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(cities);
  });
};

const createCity = (req, res) => {
  const { name, country, capital, location } = req.swagger.params.body.value;

  City.create({ name, country, capital, location }, (error, city) => {
    if (error) {
      console.error("Error", error);
    }

    res.json(city);
  });
};

const updateCity = (req, res) => {
  console.log("swagger params", req.swagger.params);
  const id = req.swagger.params.id.value;
  const opts = { upsert: true };
  const update = { $set: req.swagger.params.body.value };

  City.findOneAndUpdate({ _id: id }, update, opts, (error, city) => {
    if (error) {
      console.error("Error", error);
    }

    res.json(city);
  });
};

const deleteCity = (req, res) => {
  const id = req.swagger.params.id.value;
  City.findOneAndDelete({ _id: id }, (error, city) => {
    if (error) {
      console.error("Error", error);
    }

    res.json(city);
  });
};

module.exports = {
  getRandomCity: getRandomCity,
  getAllCities: getAllCities,
  createCity: createCity,
  updateCity: updateCity,
  deleteCity: deleteCity
};
