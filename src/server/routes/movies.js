const Router = require("koa-router");
const codes = require("http-status-codes");
const queries = require("../db/queries/movies");

const router = new Router();
const BASE_URL = "/api/v1/movies";

router.get(BASE_URL, async ctx => {
  try {
    const movies = await queries.getAllMovies();
    ctx.body = {
      status: "success",
      data: movies
    };
  } catch (err) {
    console.log(err);
  }
});

router.get(`${BASE_URL}/:id`, async ctx => {
  try {
    const movie = await queries.getSingleMovie(ctx.params.id);
    if (movie.length) {
      ctx.body = {
        status: "success",
        data: movie
      };
    } else {
      ctx.status = codes.NOT_FOUND;
      ctx.body = {
        status: "error",
        message: "That movie does not exist."
      };
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
