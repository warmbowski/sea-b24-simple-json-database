var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../lib/server.js');

var expect = chai.expect;

describe('api create and read verification', function(done) {
  
  it('should be able to create a record with json content', function(done) {
    chai.request('http://localhost:3000')
    .post('/philbert')
    .send({"hello":"world"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.eql('Record Added');
      done();
    });
  });
  
  it('should be able to get json content from a record', function(done) {
    chai.request('http://localhost:3000')
    .get('/philbert')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.be.json; 
      expect(res.body.hello).to.eql('world');
      done();
    });
  });
});