var should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest'),
request = require('superagent');
api = supertest('http://localhost:3000');

// var assert = require("assert");
require('superagent-oauth')(request);

describe('User', function(){
	it('should return a 401 response', function(done){
		api.get('/user/me')
		// .send({ user: 'hunter@hunterloftis.com', password: 'password' })
		.set('Accept', 'application/json')
		.expect(401)
		.end(function(err, res){
			// expect(res.body).to.have.property('statusCode');
			// expect(res.body.statusCode).to.not.equal(null);
			done();
		});
	});
});