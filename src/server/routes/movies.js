const Router = require('koa-router');
const codes = require('http-status-codes');
const queries = require('../../db/queries/movies');
const { versions, paths, params } = require('../../config/routes');
const messages = require('../../config/messages');
const mapMovies = require('../../services/map_movies');

const router = new Router();
const baseUrl = `${paths.api}${versions.v1}${paths.movies}`;
const statuses = codes.getStatusText;

router.get(baseUrl, async (ctx) => {
  try {
    let movies = await queries.getMovies({ params: ctx.query });

    movies = await mapMovies(movies);
    ctx.body = {
      data: movies,
    };
  } catch (err) {
    ctx.throw(err);
  }
});

router.get(`${baseUrl}${params.id}`, async (ctx) => {
  try {
    let movie = await queries.getSingleMovie(ctx.params.id);

    movie = await mapMovies(movie);
    if (movie.length) {
      ctx.body = {
        status: statuses(codes.OK),
        data: movie,
      };
    } else {
      ctx.throw(codes.NOT_FOUND);
    }
  } catch (err) {
    ctx.throw(err);
  }
});

router.post(`${baseUrl}`, async (ctx) => {
  try {
    const movie = await queries.addMovie(ctx.request.body);

    ctx.status = codes.CREATED;
    ctx.body = {
      status: statuses(codes.CREATED),
      data: movie,
    };
  } catch (error) {
    ctx.status = codes.BAD_REQUEST;
    ctx.body = {
      status: statuses(codes.BAD_REQUEST),
      message: error.message || messages.unexpected,
      error,
    };
  }
});

router.put(`${baseUrl}${params.id}`, async (ctx) => {
  try {
    const movie = await queries.updateMovie(ctx.params.id, ctx.request.body);
    if (movie.length) {
      ctx.status = codes.OK;
      ctx.body = {
        status: statuses(codes.OK),
        data: movie,
      };
    } else {
      ctx.status = codes.NOT_FOUND;
      ctx.body = {
        status: statuses(codes.NOT_FOUND),
        message: messages.notFound,
      };
    }
  } catch (err) {
    ctx.status = codes.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: statuses(codes.INTERNAL_SERVER_ERROR),
      message: err.message || messages.unexpected,
    };
  }
});

router.delete(`${baseUrl}${params.id}`, async (ctx) => {
  try {
    const movie = await queries.deleteMovie(ctx.params.id);
    if (movie.length) {
      ctx.status = codes.OK;
      ctx.body = {
        status: statuses(codes.OK),
        data: movie,
      };
    } else {
      ctx.status = codes.NOT_FOUND;
      ctx.body = {
        status: statuses(codes.NOT_FOUND),
        message: messages.notFound,
      };
    }
  } catch (err) {
    ctx.status = codes.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: statuses(codes.INTERNAL_SERVER_ERROR),
      message: err.message || messages.unexpected,
    };
  }
});

module.exports = router;
