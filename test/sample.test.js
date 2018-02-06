process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars

let greaterThanTwenty = num => num > 20;

class Person {
  constructor(givenName, familyName) {
    this.givenName = givenName;
    this.familyName = familyName;
  }

  getFullName() {
    return `${this.givenName} ${this.familyName}`;
  }
}

describe('Sample Test', () => {
  it('should pass', (done) => {
    const sum = 1 + 2;
    sum.should.eql(3);
    sum.should.not.eql(4);
    done();
  });
});

describe('Sample Sinon Stub', () => {
  it('should pass', (done) => {
    greaterThanTwenty = sinon.stub().returns('something');
    greaterThanTwenty(0).should.eql('something');
    greaterThanTwenty(0).should.not.eql(false);
    done();
  });
});

describe('Sample Sinon Stub 2', () => {
  it('should pass', (done) => {
    const name = new Person('Oleksandr', 'Afanasiev');
    name.getFullName().should.eql('Oleksandr Afanasiev');
    sinon.stub(Person.prototype, 'getFullName').returns('John Doe');
    name.getFullName().should.eql('John Doe');
    done();
  });
});
