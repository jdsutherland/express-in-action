const chai = require('chai');

const capitalize = require('../capitalize');

const expect = chai.expect;

describe('capitalize', function() {
  it('capitalizes single words', function() {
    expect(capitalize('express')).to.eql('Express');
    expect(capitalize('cats')).to.eql('Cats');
  });
});
