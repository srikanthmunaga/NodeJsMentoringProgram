import { City } from "../mongomodels/city";

export const getRandomCity = (req, res) => {
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

export const createCity = (req, res) => {
  const { name, country, capital, lat, long } = req.body;

  City.create(
    {
      name,
      country,
      capital,
      location: {
        lat: lat,
        long: long
      }
    },
    (error, city) => {
      if (error) {
        console.error("Error", error);
      }

      res.send(city);
    }
  );
};

export const getAllCities = (req, res) => {
  console.log("Inside GetAllCities");
  City.find({}, (error, cities) => {
    if (error) {
      console.error("Error", error);
    }
    console.log("getCites" + cities);
    res.send(cities);
  });
};

export const updateCity = (req, res) => {
  const { city_id } = req.params;
  const opts = { upsert: true };
  const update = { $set: req.body };

  City.findOneAndUpdate({ _id: city_id }, update, opts, (error, city) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(city);
  });
};

export const deleteCity = (req, res) => {
  const { city_id } = req.params;

  City.findOneAndDelete({ _id: city_id }, (error, city) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(city);
  });
};
