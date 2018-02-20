process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const axios = require('axios');
const chai = require('chai');
const codes = require('http-status-codes');
const movies = require('../fixtures/movies');

const should = chai.should(); // eslint-disable-line no-unused-vars
const statuses = codes.getStatusText;

const base = 'http://localhost:1337';

// Stubbing with sinon
describe('movie service', () => {
  describe('when stubbed', () => {
    beforeEach(() => {
      this.get = sinon.stub(axios, 'get');
      this.post = sinon.stub(axios, 'post');
      this.put = sinon.stub(axios, 'put');
      this.delete = sinon.stub(axios, 'delete');
    });
    afterEach(() => {
      axios.get.restore();
      axios.post.restore();
      axios.put.restore();
      axios.delete.restore();
    });
    describe('GET /api/v1/movies', () => {
      it('should return all movies', (done) => {
        this.get.yields(movies.all);
        axios.get(`${base}/api/v1/movies`, (res) => {
          res.status.should.eql(codes.OK);
          res.headers['content-type'].should.contain('application/json');
          res.data.status.should.eql(statuses(codes.OK));
          res.data.data.should.have.lengthOf.above(0);
          res.data.data[0].should.include.keys(
            'id', 'name', 'year', 'rating',
            'countries', 'genres',
          );
          res.data.data[0].countries.should.have.lengthOf.above(0);
          res.data.data[0].genres.should.have.lengthOf.above(0);
          done();
        });
      });
    });
    describe('GET /api/v1/movies/:id', () => {
      it('should respond with a single movie', (done) => {
        this.get.yields(movies.single.success);
        axios.get(`${base}/api/v1/movies/1`, (res) => {
          res.status.should.equal(codes.OK);
          res.headers['content-type'].should.contain('application/json');
          res.data.status.should.eql(statuses(codes.OK));
          res.data.data.should.include.keys(
            'id', 'name', 'year', 'rating',
            'countries', 'genres',
          );
          res.data.data.countries.should.have.lengthOf.above(0);
          res.data.data.genres.should.have.lengthOf.above(0);
          res.data.data.persons.should.have.lengthOf.above(0);
          res.data.data.persons[0].should.include.keys('id', 'fName', 'lName', 'nick', 'positions');
          done();
        });
      });
      it('should throw an error if the movie does not exist', (done) => {
        this.get.yields(movies.single.failure);
        axios.get(`${base}/api/v1/movies/999`, (res) => {
          res.status.should.equal(codes.NOT_FOUND);
          res.headers['content-type'].should.contain('application/json');
          res.data.status.should.eql(statuses(codes.NOT_FOUND));
          res.data.message.should.eql(statuses(codes.NOT_FOUND));
          done();
        });
      });
    });
    describe('POST /api/v1/movies', () => {
      it('should return the movie that was added', (done) => {
        const url = `${base}/api/v1/movies`;
        const data = {
          name: 'Titanic',
          year: 1997,
          rating: 7.8,
        };
        this.post.yields(movies.add.success);
        axios.post(url, data, (res) => {
          res.status.should.equal(codes.CREATED);
          res.headers['content-type'].should.contain('application/json');
          res.data.status.should.eql(statuses(codes.CREATED));
          res.data.data.should.include.keys(
            'id', 'name', 'rating', 'info',
            'created_at', 'updated_at',
          );
          done();
        });
      });
      it('should throw an error if the payload is malformed', (done) => {
        const url = `${base}/api/v1/movies`;
        const data = { name: 'Titanic' };
        this.post.yields(movies.add.failure);
        axios.post(url, data, (res) => {
          res.status.should.equal(codes.BAD_REQUEST);
          res.headers['content-type'].should.contain('application/json');
          res.data.status.should.eql(statuses(codes.BAD_REQUEST));
          should.exist(res.data.message);
          done();
        });
      });
    });
    describe('PUT /api/v1/movies', () => {
      it('should return the movie that was updated', (done) => {
        const url = `${base}/api/v1/movies/5`;
        const data = { rating: 9 };
        this.put.yields(movies.update.success);
        axios.put(url, data, (res) => {
          res.status.should.equal(codes.OK);
          res.headers['content-type'].should.contain('application/json');
          res.data.status.should.eql(statuses(codes.OK));
          res.data.data.should.include.keys('id', 'name', 'year', 'rating', 'info');
          res.data.data.name.should.eql('Titanic');
          res.data.data.rating.should.eql(9);
          done();
        });
      });
      it('should throw an error if the movie does not exist', (done) => {
        const url = `${base}/api/v1/movies/999999999`;
        const data = { name: 'Titanic' };
        this.put.yields(movies.update.failure);
        axios.put(url, data, (res) => {
          res.status.should.equal(codes.NOT_FOUND);
          res.headers['content-type'].should.contain('application/json');
          res.data.status.should.eql(statuses(codes.NOT_FOUND));
          should.exist(res.data.message);
          done();
        });
      });
    });
    describe('DELETE /api/v1/movies', () => {
      it('should return the movie that was deleted', (done) => {
        const url = `${base}/api/v1/movies/5`;
        const data = { rating: 9 };
        this.delete.yields(movies.delete.success);
        axios.delete(url, data, (res) => {
          res.status.should.equal(codes.OK);
          res.headers['content-type'].should.contain('application/json');
          res.data.status.should.eql(statuses(codes.OK));
          res.data.data.should.include.keys('id', 'name', 'year', 'rating', 'info');
          res.data.data.name.should.eql('Titanic');
          done();
        });
      });
      it('should throw an error if the payload is malformed', (done) => {
        const url = `${base}/api/v1/movies/999999999`;
        const data = { name: 'Titanic' };
        this.delete.yields(movies.delete.failure);
        axios.delete(url, data, (res) => {
          res.status.should.equal(codes.NOT_FOUND);
          res.headers['content-type'].should.contain('application/json');
          res.data.status.should.eql(statuses(codes.NOT_FOUND));
          should.exist(res.data.message);
          done();
        });
      });
    });
  });
});
