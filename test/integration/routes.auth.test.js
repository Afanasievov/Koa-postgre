process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const codes = require('http-status-codes');
const app = require('../../src/server/');
const logger = require('../../src/services/logger');
const knex = require('../../src/db/connection');
const { port, host } = require('../../src/config/server.config');
const { paths, versions } = require('../../src/config/routes');

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
  describe(`GET ${baseUrl}${paths.register}`, () => {
    it('should render the register view', (done) => {
      chai.request(server)
        .get(`${baseUrl}${paths.register}`)
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(codes.OK);
          res.type.should.eql('text/html');
          res.text.should.contain('<h1>Register</h1>');
          res.text.should
            .contain('<p><button type="submit">Register</button></p>');
          done();
        });
    });
  });

  describe(`POST ${baseUrl}${paths.register}`, () => {
    it('should register a new user', (done) => {
      chai.request(server)
        .post(`${baseUrl}${paths.register}`)
        .send({
          username: 'michael',
          password: 'herman',
        })
        .end((err, res) => {
          res.redirects[0].should.contain(`${baseUrl}${paths.status}`);
          done();
        });
    });
  });

  describe(`GET ${baseUrl}${paths.login}`, () => {
    it('should render the login view', (done) => {
      chai.request(server)
        .get(`${baseUrl}${paths.login}`)
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(codes.OK);
          res.type.should.eql('text/html');
          res.text.should.contain('<h1>Login</h1>');
          res.text.should
            .contain('<p><button type="submit">Log In</button></p>');
          done();
        });
    });
  });
  describe(`POST ${baseUrl}${paths.login}`, () => {
    it('should login a user', (done) => {
      chai.request(server)
        .post(`${baseUrl}${paths.login}`)
        .send({
          username: 'jer',
          password: 'johnson',
        })
        .end((err, res) => {
          res.redirects[0].should.contain(`${baseUrl}${paths.status}`);
          done();
        });
    });
  });
});

