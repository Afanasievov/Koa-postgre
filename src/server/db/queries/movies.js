const knex = require("../connection");

const getAllMovies = () => knex("movies").select("*");

const getSingleMovie = id =>
  knex("movies")
    .select("*")
    .where({ id: parseInt(id) });

module.exports = {
  getAllMovies,
  getSingleMovie
};
