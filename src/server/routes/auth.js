const Router = require('koa-router');
const { versions, paths } = require('../../config/routes');
const ctrl = require('../controllers/auth.controller');

const router = new Router();
const baseUrl = `${paths.api}${versions.v1}${paths.auth}`;

router.get(`${baseUrl}${paths.register}`, ctrl.getRegister);

router.post(`${baseUrl}${paths.register}`, ctrl.postRegister);

router.get(`${baseUrl}${paths.status}`, ctrl.getStatus);

router.get(`${baseUrl}${paths.login}`, ctrl.getLogin);

router.post(`${baseUrl}${paths.login}`, ctrl.postLogin);

router.get(`${baseUrl}${paths.logout}`, ctrl.getLogout);

module.exports = router;
