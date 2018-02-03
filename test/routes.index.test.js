process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const codes = require('http-status-codes');
const server = require('../src/server/index');

const should = chai.should();
chai.use(chaiHttp);

describe('routes : index', () => {
  describe('GET /', () => {
    it('Should return json', (done) => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(codes.OK);
          res.body.status.should.equal('success');
          res.body.message.should.eql('hello, world!');
          done();
        });
    });
  });
});
