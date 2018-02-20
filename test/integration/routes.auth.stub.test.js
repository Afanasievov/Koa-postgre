process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const passport = require('koa-passport');
const codes = require('http-status-codes');
const app = require('../../src/server/');
const store = require('../../src/server/session');
const auth = require('../../src/server/middlewars/auth');
const queries = require('../../src/db/queries/users');
const logger = require('../../src/server/services/logger');
const { port, host } = require('../../src/server/config/server.config');
const { paths, versions } = require('../../src/server/config/routes');

chai.use(chaiHttp);
const should = chai.should();
const baseUrl = `${paths.api}${versions.v1}${paths.auth}`;
const statuses = codes.getStatusText;
let server;
let user;

describe('routes : auth - stubbed', () => {
  before(() => new Promise((resolve, reject) =>
    Promise.resolve()
      .then(() => {
        server = app.listen(port, host, () =>
          logger.info(`Server is listening on ${host}:${port}.`));
      })
      .then(() => {
        this.ensureAuthenticated = sinon.stub(auth, 'ensureAuthenticated').returns(() => {});
        this.store = sinon.stub(store, 'set');
        this.authenticate = sinon.stub(passport, 'authenticate').returns(() => {});
        this.serialize = sinon.stub(passport, 'serializeUser').returns(() => {});
        this.deserialize = sinon.stub(passport, 'deserializeUser').returns(() => {});
      })
      .then(() => resolve())
      .catch(err => reject(err))));

  after(() => new Promise((resolve, reject) =>
    Promise.resolve()
      .then(() => server.close())
      .then(() => logger.info('Server is closed.'))
      .then(() => {
        this.ensureAuthenticated.restore();
        this.store.restore();
        this.authenticate.restore();
        this.serialize.restore();
        this.deserialize.restore();
      })
      .then(() => resolve())
      .catch(err => reject(err))));

  describe(`POST ${baseUrl}${paths.register}`, () => {
    beforeEach(() => {
      user = {
        id: 1,
        username: 'michael',
        password: 'something',
      };
      this.query = sinon.stub(queries, 'addUser').resolves(user);
      this.authenticate.yields(null, user);
      this.serialize.yields(null, user);
    });
    afterEach(() => {
      this.query.restore();
    });
    it('should register a new user', (done) => {
      chai.request(server)
        .post(`${baseUrl}${paths.register}`)
        .send({
          username: 'michael',
          password: 'herman',
        })
        .end((err, res) => {
          res.status.should.eql(codes.OK);
          res.body.should.include.keys('username');
          done();
        });
    });
  });

  describe(`POST ${baseUrl}${paths.login}`, () => {
    beforeEach(() => {
      this.ensureAuthenticated.returns(true);
    });
    it('should login a user', (done) => {
      chai.request(server)
        .post(`${baseUrl}${paths.login}`)
        .send({
          username: 'jeremy',
          password: 'johnson',
        })
        .end((err, res) => {
          res.status.should.eql(codes.OK);
          res.body.should.include.keys('id', 'username');
          done();
        });
    });
  });
  describe(`POST ${baseUrl}${paths.login}`, () => {
    beforeEach(() => {
      this.authenticate.yields(null, false);
    });
    it('should not login a user if the password is incorrect', (done) => {
      chai.request(server)
        .post(`${baseUrl}${paths.login}`)
        .send({
          username: 'jeremy',
          password: 'incorrect',
        })
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(codes.UNAUTHORIZED);
          res.type.should.eql('application/json');
          res.body.status.should.eql(statuses(codes.UNAUTHORIZED));
          done();
        });
    });
  });
});

