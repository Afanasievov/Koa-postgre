const codes = require('http-status-codes');
const queries = require('../../db/queries/movies');
const mapMovies = require('../services/map_movies');

const statuses = codes.getStatusText;

const getAllMovies = async (ctx) => {
  try {
    let movies = await queries.getMovies();

    movies = await mapMovies(movies);
    ctx.body = {
      message: statuses(codes.OK),
      data: movies,
    };
  } catch (err) {
    ctx.throw(err);
  }
};

const getSingleMovie = async (ctx) => {
  try {
    let movie = await queries.getSingleMovie(ctx.params.id);

    movie = await mapMovies(movie)[0];
    if (movie) {
      ctx.body = {
        message: statuses(codes.OK),
        data: movie,
      };
    } else {
      ctx.throw(codes.NOT_FOUND);
    }
  } catch (err) {
    ctx.throw(err);
  }
};

const addMovie = async (ctx) => {
  try {
    const movie = await queries.addMovie(ctx.request.body);

    ctx.status = codes.CREATED;
    ctx.body = {
      message: statuses(codes.CREATED),
      data: movie[0],
    };
  } catch (err) {
    ctx.throw(err);
  }
};

const updateMovie = async (ctx) => {
  try {
    const movies = await queries.updateMovie(ctx.params.id, ctx.request.body);
    if (movies.length) {
      ctx.status = codes.OK;
      ctx.body = {
        message: statuses(codes.OK),
        data: movies[0],
      };
    } else {
      ctx.throw(codes.NOT_FOUND);
    }
  } catch (err) {
    ctx.throw(err);
  }
};

const deleteMovie = async (ctx) => {
  try {
    const movies = await queries.deleteMovie(ctx.params.id);
    if (movies.length) {
      ctx.status = codes.OK;
      ctx.body = {
        message: statuses(codes.OK),
        data: movies[0],
      };
    } else {
      ctx.throw(codes.NOT_FOUND);
    }
  } catch (err) {
    ctx.throw(err);
  }
};

module.exports = {
  getAllMovies,
  getSingleMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
