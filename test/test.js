var should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:3000');

// var assert = require("assert");

describe('User', function(){
	it('should return a 200 response', function(done)){
		api.get('/users/1')
		.set('Accept', 'application/json')
		.expect(200, done)
	}
});