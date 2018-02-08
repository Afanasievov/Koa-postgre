process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const codes = require('http-status-codes');
const server = require('../src/server/index');
const knex = require('../src/server/db/connection');
const { paths, versions } = require('../src/config/routes');

chai.use(chaiHttp);
const should = chai.should();

describe('routes : auth', () => {
  beforeEach(() => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run()));

  afterEach(() => knex.migrate.rollback());

  describe(`GET ${paths.auth}${paths.register}`, () => {
    it('should render the register view', (done) => {
      chai.request(server)
        .get(`/api${versions.v1}${paths.auth}${paths.register}`)
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

  describe(`GET ${paths.auth}${paths.login}`, () => {
    it('should render the login view', (done) => {
      chai.request(server)
        .get(`/api${versions.v1}${paths.auth}${paths.login}`)
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
  describe(`POST ${paths.auth}${paths.login}`, () => {
    it('should login a user', (done) => {
      chai.request(server)
        .post(`/api${versions.v1}${paths.auth}${paths.login}`)
        .send({
          username: 'jeremy',
          password: 'johnson',
        })
        .end((err, res) => {
          res.redirects[0].should.contain(`${paths.auth}${paths.status}`);
          done();
        });
    });
  });
});

