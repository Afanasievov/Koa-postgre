const Router = require('koa-router');
const { versions, paths } = require('../config/routes.config');
const auth = require('../middlewars/auth');
const ctrl = require('../controllers/auth.controller');

const router = new Router();
const baseUrl = `${paths.api}${versions.v1}${paths.auth}`;

router.post(`${baseUrl}${paths.register}`, ctrl.postRegister);
router.post(`${baseUrl}${paths.login}`, ctrl.postLogin);
router.get(`${baseUrl}${paths.logout}`, auth.ensureAuthenticated, ctrl.getLogout);

module.exports = router;
