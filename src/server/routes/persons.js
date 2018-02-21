const Router = require('koa-router');
const { versions, paths, params } = require('../config/routes.config');
const ctrl = require('../controllers/persons.controller');

const router = new Router();
const baseUrl = `${paths.api}${versions.v1}${paths.persons}`;

router.get(baseUrl, ctrl.getAllPersons);
router.get(`${baseUrl}${params.id}`, ctrl.getSinglePerson);
router.post(`${baseUrl}`, ctrl.addPerson);
router.put(`${baseUrl}${params.id}`, ctrl.updatePerson);
router.delete(`${baseUrl}${params.id}`, ctrl.deletePerson);

module.exports = router;
