const Router = require('koa-router');
const codes = require('http-status-codes');
const queries = require('../db/queries/movies');
const logger = require('../services/logger');

const router = new Router();
const BASE_URL = '/api/v1/movies';
router.get(BASE_URL, async (ctx) => {
  try {
    const movies = await queries.getAllMovies();

    ctx.body = {
      status: 'success',
      data: movies
    };
  } catch (err) {
    logger.error(err.message || err.Message || err);
  }
});

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const movie = await queries.getSingleMovie(ctx.params.id);
    if (movie.length) {
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = codes.NOT_FOUND;
      ctx.body = {
        status: 'error',
        message: 'That movie does not exist.'
      };
    }
  } catch (err) {
    ctx.status = codes.BAD_REQUEST;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const movie = await queries.addMovie(ctx.request.body);
    if (movie.length) {
      ctx.status = codes.CREATED;
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = codes.BAD_REQUEST;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    ctx.status = codes.BAD_REQUEST;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

router.put(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const movie = await queries.updateMovie(ctx.params.id, ctx.request.body);
    if (movie.length) {
      ctx.status = codes.OK;
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = codes.NOT_FOUND;
      ctx.body = {
        status: 'error',
        message: 'That movie does not exist.'
      };
    }
  } catch (err) {
    ctx.status = codes.BAD_REQUEST;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

router.delete(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const movie = await queries.deleteMovie(ctx.params.id);
    if (movie.length) {
      ctx.status = codes.OK;
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = codes.NOT_FOUND;
      ctx.body = {
        status: 'error',
        message: 'That movie does not exist.'
      };
    }
  } catch (err) {
    ctx.status = codes.BAD_REQUEST;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

module.exports = router;
