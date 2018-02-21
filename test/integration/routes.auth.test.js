process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const codes = require('http-status-codes');
const app = require('../../src/server/');
const logger = require('../../src/server/services/logger');
const knex = require('../../src/db/connection');
const pgErrors = require('../../src/server/config/pg_error_codes.config');
const { port, host } = require('../../src/server/config/server.config');
const { paths, versions } = require('../../src/server/config/routes.config');

chai.use(chaiHttp);
const should = chai.should();
const statuses = codes.getStatusText;
const baseUrl = `${paths.api}${versions.v1}${paths.auth}`;
let server;
let agent;

describe('routes : auth', () => {
  before(() => new Promise((resolve, reject) =>
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => {
        server = app.listen(port, host, () =>
          logger.info(`Server is listening on ${host}:${port}.`));
        agent = chai.request.agent(server);
      })
      .then(() => resolve())
      .catch(err => reject(err))));

  after(() => new Promise((resolve, reject) =>
    knex.migrate.rollback()
      .then(() => server.close())
      .then(() => resolve(logger.info('Server is closed.')))
      .catch(err => reject(err))));

  describe(`POST ${baseUrl}${paths.register}`, () => {
    const username = 'int_test';
    const password = 'int_pass';

    it('should register a new user', (done) => {
      chai
        .request(server)
        .post(`${baseUrl}${paths.register}`)
        .send({ username, password })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(codes.OK);
          res.type.should.eql('application/json');
          res.body.should.include.keys('id', 'username', 'fName', 'lName', 'email');
          res.body.username.should.eql(username);
          done();
        });
    });
    it('should respond with 400 error in case of username is already exist', (done) => {
      chai
        .request(server)
        .post(`${baseUrl}${paths.register}`)
        .send({ username, password: 'secret' })
        .end((err, res) => {
          res.status.should.eql(codes.BAD_REQUEST);
          res.type.should.eql('application/json');
          res.body.error.code.should.eql(pgErrors.uniqueViolation);
          done();
        });
    });
    it('should respond with 400 error in case of username is absent', (done) => {
      chai
        .request(server)
        .post(`${baseUrl}${paths.register}`)
        .send({ password })
        .end((err, res) => {
          res.status.should.eql(codes.BAD_REQUEST);
          res.type.should.eql('application/json');
          res.body.error.code.should.eql(pgErrors.notNullViolation);
          res.body.error.column.should.equal('username');
          done();
        });
    });
    it('should respond with 400 error in case of password is absent', (done) => {
      chai
        .request(server)
        .post(`${baseUrl}${paths.register}`)
        .send({ username: 'new_user' })
        .end((err, res) => {
          res.status.should.eql(codes.BAD_REQUEST);
          res.type.should.eql('application/json');
          res.body.error.code.should.eql(pgErrors.notNullViolation);
          res.body.error.column.should.equal('password');
          done();
        });
    });
  });
  describe(`POST ${baseUrl}${paths.login}`, () => {
    const username = 'jer';
    const password = 'johnson';

    it('should login a user', (done) => {
      chai
        .request(server)
        .post(`${baseUrl}${paths.login}`)
        .send({ username, password })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(codes.OK);
          res.type.should.equal('application/json');
          res.body.should.include.keys('id', 'username', 'fName', 'lName', 'email');
          done();
        });
    });
    it('should respond with 401 error in case of username is absent', (done) => {
      chai
        .request(server)
        .post(`${baseUrl}${paths.login}`)
        .send({ password })
        .end((err, res) => {
          res.status.should.eql(codes.UNAUTHORIZED);
          res.type.should.eql('application/json');
          res.body.message.should.eql(statuses(codes.UNAUTHORIZED));
          done();
        });
    });
    it('should respond with 401 error in case of password is absent', (done) => {
      chai
        .request(server)
        .post(`${baseUrl}${paths.login}`)
        .send({ password })
        .end((err, res) => {
          res.status.should.eql(codes.UNAUTHORIZED);
          res.type.should.eql('application/json');
          res.body.message.should.eql(statuses(codes.UNAUTHORIZED));
          done();
        });
    });
    it('should respond with 401 error in case of username and password don\'t match', (done) => {
      chai
        .request(server)
        .post(`${baseUrl}${paths.login}`)
        .send({ username, password: 'wrong' })
        .end((err, res) => {
          res.status.should.eql(codes.UNAUTHORIZED);
          res.type.should.eql('application/json');
          res.body.message.should.eql(statuses(codes.UNAUTHORIZED));
          done();
        });
    });
  });
  describe(`GET ${baseUrl}${paths.logout}`, () => {
    const username = 'jer';
    const password = 'johnson';

    it('should logout a user', (done) => {
      agent
        .post(`${baseUrl}${paths.login}`)
        .send({ username, password })
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.cookie('koa:sess');
          res.should.have.cookie('koa:sess.sig');

          return agent
            .get(`${baseUrl}${paths.logout}`)
            .then((resLogout) => {
              resLogout.status.should.eql(codes.OK);
              done();
            });
        });
    });
    it('should respond with 401 error in case of user doesn\'t have cookies', (done) => {
      chai
        .request(server)
        .get(`${baseUrl}${paths.logout}`)
        .end((err, res) => {
          res.status.should.eql(codes.UNAUTHORIZED);
          res.type.should.eql('application/json');
          res.body.message.should.eql(statuses(codes.UNAUTHORIZED));
          done();
        });
    });
  });
});

