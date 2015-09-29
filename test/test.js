var should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest'),
request = require('superagent');
api = supertest('http://localhost:3000');

// var assert = require("assert");
require('superagent-oauth')(request);

describe('User', function(){
	it('should return a 200 response', function(done)){
		api.get('/users/1')
		.send({ user: 'hunter@hunterloftis.com', password: 'password' })
		.set('Accept', 'application/json')
		.expect(200, done)
	}
});