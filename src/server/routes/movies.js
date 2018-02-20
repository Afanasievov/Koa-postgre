const Router = require('koa-router');
const { versions, paths, params } = require('../config/routes');
// const auth = require('../middlewars/auth');
const ctrl = require('../controllers/movies.controller');

const router = new Router();
const baseUrl = `${paths.api}${versions.v1}${paths.movies}`;

router.get(baseUrl, ctrl.getAllMovies);
router.get(`${baseUrl}${params.id}`, ctrl.getSingleMovie);
router.post(`${baseUrl}`, ctrl.addMovie);
router.put(`${baseUrl}${params.id}`, ctrl.updateMovie);
router.delete(`${baseUrl}${params.id}`, ctrl.deleteMovie);

module.exports = router;
