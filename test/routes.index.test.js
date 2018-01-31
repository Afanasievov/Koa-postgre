process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const codes = require('http-status-codes');

chai.use(chaiHttp);

const server = require('../src/server/index');

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
