process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const axios = require('axios');
const chai = require('chai');
const codes = require('http-status-codes');
const movies = require('./fixtures/movies');

const should = chai.should(); // eslint-disable-line no-unused-vars

const base = 'http://localhost:1337';

// Stubbing with sinon
describe.skip('movie service', () => {
  describe('when not stubbed', () => {
    describe('GET /api/v1/movies', () => {
      it('should return all movies', (done) => {
        axios.get(`${base}/api/v1/movies`)
          .then((res) => {
            res.status.should.eql(codes.OK);
            res.headers['content-type'].should.contain('application/json');
            res.data.status.should.eql('success');
            res.data.data.length.should.eql(3);
            res.data.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
            res.data.data[0].name.should.eql('The Land Before Time');
            done();
          });
      });
    });
  });

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
          res.data.status.should.eql('success');
          res.data.data.length.should.eql(3);
          res.data.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
          res.data.data[0].name.should.eql('The Land Before Time');
          done();
        });
      });
    });
    describe('GET /api/v1/movies/:id', () => {
      it('should respond with a single movie', (done) => {
        this.get.yields(movies.single.success);
        axios.get(`${base}/api/v1/movies/4`, (res) => {
          res.status.should.equal(codes.OK);
          res.headers['content-type'].should.contain('application/json');
          res.data.status.should.eql('success');
          res.data.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
          res.data.data[0].name.should.eql('The Land Before Time');
          done();
        });
      });
      it('should throw an error if the movie does not exist', (done) => {
        this.get.yields(movies.single.failure);
        axios.get(`${base}/api/v1/movies/999`, (res) => {
          res.status.should.equal(codes.NOT_FOUND);
          res.headers['content-type'].should.contain('application/json');
          res.data.status.should.eql('error');
          res.data.message.should.eql('That movie does not exist.');
          done();
        });
      });
    });
    describe('POST /api/v1/movies', () => {
      it('should return the movie that was added', (done) => {
        const url = `${base}/api/v1/movies`;
        const data = {
          name: 'Titanic',
          genre: 'Drama',
          rating: 8,
          explicit: true,
        };
        this.post.yields(movies.add.success);
        axios.post(url, data, (res) => {
          res.status.should.equal(codes.CREATED);
          res.headers['content-type'].should.contain('application/json');
          res.data.status.should.eql('success');
          res.data.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
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
          res.data.status.should.eql('error');
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
          res.data.status.should.eql('success');
          res.data.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
          res.data.data[0].name.should.eql('Titanic');
          res.data.data[0].rating.should.eql(9);
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
          res.data.status.should.eql('error');
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
          res.data.status.should.eql('success');
          res.data.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
          res.data.data[0].name.should.eql('Titanic');
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
          res.data.status.should.eql('error');
          should.exist(res.data.message);
          done();
        });
      });
    });
  });
});
