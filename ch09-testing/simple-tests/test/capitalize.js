const chai = require('chai');

const capitalize = require('../capitalize');

const expect = chai.expect;

describe('capitalize', function() {
  it('capitalizes single words', function() {
    expect(capitalize('express')).to.eql('Express');
  });

  it('makes the rest of the string lowercase', function() {
    expect(capitalize('exPRESs')).to.eql('Express');
  });

  it('leaves empty strings alone', function() {
    expect(capitalize('')).to.eql('');
  });

  it('leaves an already capitalized words alone', function() {
    expect(capitalize('Express')).to.eql('Express');
  });

  it('leaves a string with no words alone', function() {
    expect(capitalize('  ')).to.eql('  ');
    expect(capitalize('123')).to.eql('123');
  });

  it('capitalizes multi-word strings', function() {
    expect(capitalize('what is express?')).to.eql('What is express?');
    expect(capitalize('i love express')).to.eql('I love express');
  });

  it("doesn't blow up when starting with a number", function() {
    expect(capitalize('21 grams')).to.eql('21 grams');
  });
});
