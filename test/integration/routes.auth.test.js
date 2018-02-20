process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const codes = require('http-status-codes');
const app = require('../../src/server/');
const logger = require('../../src/server/services/logger');
const knex = require('../../src/db/connection');
const { port, host } = require('../../src/server/config/server.config');
const { paths, versions } = require('../../src/server/config/routes');

chai.use(chaiHttp);
const should = chai.should();
const baseUrl = `${paths.api}${versions.v1}${paths.auth}`;
let server;

describe('routes : auth', () => {
  before(() => new Promise((resolve, reject) =>
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => {
        server = app.listen(port, host, () =>
          logger.info(`Server is listening on ${host}:${port}.`));
      })
      .then(() => resolve())
      .catch(err => reject(err))));

  after(() => new Promise((resolve, reject) =>
    knex.migrate.rollback()
      .then(() => server.close())
      .then(() => resolve(logger.info('Server is closed.')))
      .catch(err => reject(err))));

  describe(`POST ${baseUrl}${paths.login}`, () => {
    it('should login a user', (done) => {
      chai
        .request(server)
        .post(`${baseUrl}${paths.login}`)
        .send({ username: 'jer', password: 'johnson' })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(codes.OK);
          res.type.should.equal('application/json');
          res.body.should.include.keys('id', 'username', 'fName', 'lName', 'email');
          done();
        });
    });
  });
});

