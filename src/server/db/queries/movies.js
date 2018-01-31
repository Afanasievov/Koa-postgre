const knex = require("../connection");

const getAllMovies = () => knex("movies").select("*");

const getSingleMovie = id =>
  knex("movies")
    .select("*")
    .where({ id: parseInt(id) });

const addMovie = movie =>
  knex("movies")
    .insert(movie)
    .returning("*");

const updateMovie = (id, movie) =>
  knex("movies")
    .update(movie)
    .where({ id: parseInt(id) })
    .returning("*");

const deleteMovie = id =>
  knex("movies")
    .del()
    .where({ id: parseInt(id) })
    .returning("*");

module.exports = {
  getAllMovies,
  getSingleMovie,
  addMovie,
  updateMovie,
  deleteMovie
};
