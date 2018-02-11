process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const codes = require('http-status-codes');
const app = require('../../src/server/');
const logger = require('../../src/services/logger');
const knex = require('../../src/server/db/connection');
const { port, host } = require('../../src/config/server.config');
const { paths, params, versions } = require('../../src/config/routes');
const messages = require('../../src/config/messages');

chai.use(chaiHttp);
const should = chai.should();
const statuses = codes.getStatusText;
const baseUrl = `${paths.api}${versions.v1}${paths.movies}`;
let server;

describe('routes : movies', () => {
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

  describe(`GET ${baseUrl}${paths.movies}`, () => {
    it('should return all movies', (done) => {
      chai
        .request(server)
        .get(baseUrl)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(codes.OK);
          res.type.should.eql('text/html');
          res.text.should.contain('<h1>Movies</h1>');
          done();
        });
    });
  });

  describe(`GET ${baseUrl}${params.id}`, () => {
    it('should respond with a single movie', (done) => {
      chai
        .request(server)
        .get(`${baseUrl}/1`)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(codes.OK);
          res.type.should.equal('application/json');
          res.body.status.should.eql(statuses(codes.OK));
          res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
          done();
        });
    });

    it('should throw an error if the movie does not exist', (done) => {
      chai
        .request(server)
        .get(`${baseUrl}/999999999`)
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(codes.NOT_FOUND);
          res.type.should.equal('application/json');
          res.body.status.should.eql(statuses(codes.NOT_FOUND));
          res.body.message.should.eql(messages.notFound);
          done();
        });
    });
  });

  describe(`POST ${baseUrl}`, () => {
    it('should return the movie that was added', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send({
          name: 'Titanic',
          genre: 'Drama',
          rating: 8,
          explicit: true,
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(codes.CREATED);
          res.type.should.equal('application/json');
          res.body.status.should.eql(statuses(codes.CREATED));
          res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
          done();
        });
    });

    it('should throw an error if the payload is malformed', (done) => {
      chai
        .request(server)
        .post(baseUrl)
        .send({
          name: 'Titanic',
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(codes.BAD_REQUEST);
          res.type.should.equal('application/json');
          res.body.status.should.eql(statuses(codes.BAD_REQUEST));
          should.exist(res.body.message);
          done();
        });
    });
  });

  describe(`PUT ${baseUrl}`, () => {
    it('should return the movie that was updated', (done) => {
      knex('movies')
        .select('*')
        .then((movie) => {
          const movieObject = movie[0];
          chai
            .request(server)
            .put(`${baseUrl}/${movieObject.id}`)
            .send({
              rating: 9,
            })
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(codes.OK);
              res.type.should.equal('application/json');
              res.body.status.should.eql(statuses(codes.OK));
              res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
              const newMovieObject = res.body.data[0];
              newMovieObject.rating.should.not.eql(movieObject.rating);
              done();
            });
        });
    });

    it('should throw an error if the movie does not exist', (done) => {
      chai
        .request(server)
        .put(`${baseUrl}/999999999`)
        .send({
          rating: 9,
        })
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(codes.NOT_FOUND);
          res.type.should.equal('application/json');
          res.body.status.should.eql(statuses(codes.NOT_FOUND));
          res.body.message.should.eql(messages.notFound);
          done();
        });
    });
  });

  describe(`DELETE ${baseUrl}${params.id}`, () => {
    it('should return the movie that was deleted', (done) => {
      knex('movies')
        .select('*')
        .then((movies) => {
          const movieObject = movies[0];
          const lengthBeforeDelete = movies.length;
          chai
            .request(server)
            .delete(`${baseUrl}/${movieObject.id}`)
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(codes.OK);
              res.type.should.equal('application/json');
              res.body.status.should.eql(statuses(codes.OK));
              res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
              knex('movies')
                .select('*')
                .then((updatedMovies) => {
                  updatedMovies.length.should.eql(lengthBeforeDelete - 1);
                  done();
                });
            });
        });
    });

    it('should throw an error if the movie does not exist', (done) => {
      chai
        .request(server)
        .delete(`${baseUrl}/999999999`)
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(codes.NOT_FOUND);
          res.type.should.equal('application/json');
          res.body.status.should.eql(statuses(codes.NOT_FOUND));
          res.body.message.should.eql(messages.notFound);
          done();
        });
    });
  });
});
