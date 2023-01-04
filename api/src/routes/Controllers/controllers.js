const axios = require("axios");
const { Country, Activities } = require("../../db.js");

const countriesLoader = async () => {
  const responseApi = await axios.get("https://restcountries.com/v3/all");
  const myData = await responseApi.data.map((elemento) => {
    return {
      id: elemento.cca3,
      name: elemento.name.common,
      continent: elemento.region,
      capital: elemento.capital ? elemento.capital[0] : "x",
      subregion: elemento.subregion ? elemento.subregion : "x",
      area: elemento.area,
      population: elemento.population,
      flags: elemento.flags[1],
    };
  });

  myData.forEach((country) => {
    Country.findOrCreate({
      where: {
        id: country.id,
        name: country.name,
        continent: country.continent,
        capital: country.capital,
        subregion: country.subregion,
        area: country.area,
        population: country.population,
        flags: country.flags,
      },
    });
  });
};

const findCountriesbyId = (id, countries) => {
  const countryFilter = countries.find(
    (country) => country.id.toLowerCase() === id.toLowerCase()
  );
  if (!countryFilter)
    throw new Error("No se encontró ningún país con el id ingresado");
  return countryFilter;
};

const findCountry = async () => {
  const allCountry = await Country.findAll({
    include: [
      {
        model: Activities,
        attributes: ["name", "dificulty", "duration", "season"],
      },
    ],
  });
  return allCountry;
};

const createActivity = async (name, dificulty, duration, season, paises) => {
  let newActivity = await Activities.create({
    name,
    dificulty,
    duration,
    season,
  });
  const paisesAll = await Country.findAll({
    where: {
      name: paises,
    },
  });
  newActivity.addCountry(paisesAll);
};

const getAllActivities = async function () {
  const data = await Activities.findAll({
    include: [
      {
        model: Country,
        attributes: ["name"],
        through: {
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      },
    ],
  });
  return data;
};

const deleteActivity = async (id) => {
  await Activities.destroy({ where: { id } });
};

const putUpdate = async (data, id) => {
  await Activities.update(data, { where: { id } });
};

module.exports = {
  countriesLoader,
  findCountriesbyId,
  findCountry,
  createActivity,
  getAllActivities,
  deleteActivity,
  putUpdate,
};
