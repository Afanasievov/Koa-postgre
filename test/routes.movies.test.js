process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const codes = require('http-status-codes');
const server = require('../src/server/index');
const knex = require('../src/server/db/connection');
const { paths, params, versions } = require('../src/config/routes');
const messages = require('../src/config/messages');

const should = chai.should();
const statuses = codes.getStatusText;
chai.use(chaiHttp);

describe('routes : movies', () => {
  beforeEach(() =>
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run()));

  afterEach(() => knex.migrate.rollback());

  describe(`GET ${paths.movies}`, () => {
    it('should return all movies', (done) => {
      chai
        .request(server)
        .get(`/api${versions.v1}${paths.movies}`)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(codes.OK);
          res.type.should.equal('application/json');
          res.body.status.should.eql(statuses(codes.OK));
          res.body.data.length.should.eql(3);
          res.body.data[0].should.include.keys(
            'id',
            'name',
            'genre',
            'rating',
            'explicit',
          );
          done();
        });
    });
  });

  describe(`GET ${paths.movies}${params.id}`, () => {
    it('should respond with a single movie', (done) => {
      chai
        .request(server)
        .get(`/api${versions.v1}${paths.movies}/1`)
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
        .get(`/api${versions.v1}${paths.movies}/999999999`)
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

  describe(`POST ${paths.movies}`, () => {
    it('should return the movie that was added', (done) => {
      chai
        .request(server)
        .post(`/api${versions.v1}${paths.movies}`)
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
        .post(`/api${versions.v1}${paths.movies}`)
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

  describe(`PUT ${paths.movies}`, () => {
    it('should return the movie that was updated', (done) => {
      knex('movies')
        .select('*')
        .then((movie) => {
          const movieObject = movie[0];
          chai
            .request(server)
            .put(`/api${versions.v1}${paths.movies}/${movieObject.id}`)
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
        .put(`/api${versions.v1}${paths.movies}/999999999`)
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

  describe(`DELETE ${paths.movies}${params.id}`, () => {
    it('should return the movie that was deleted', (done) => {
      knex('movies')
        .select('*')
        .then((movies) => {
          const movieObject = movies[0];
          const lengthBeforeDelete = movies.length;
          chai
            .request(server)
            .delete(`/api${versions.v1}${paths.movies}/${movieObject.id}`)
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
        .delete(`/api${versions.v1}${paths.movies}/999999999`)
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
