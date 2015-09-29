var should = require('chai').should(),
	expect = require('chai').expect,
	supertest = require('supertest'),
	request = require('superagent');
	api = supertest('http://localhost:3000'),
	env = require('../env/config'),
	app = require('../server')
	passportMock = require('./passport-mock');

// var assert = require("assert");
require('superagent-oauth')(request);

describe('User', function(){


	it('unauthorized users should return a 401 response', function(done){
		api.get('/user/me')
		.set('Accept', 'application/json')
		.expect(401)
		.end(function(err, res){
			// expect(res.body).to.have.property('statusCode');
			// expect(res.body.statusCode).to.not.equal(null);
			done();
		});
	});


	// it('authorized users should return a 200 response with profile data', function(done){
	// 	api.get('/user/me')
	// 	.sign(oauth, env.twitter.consumerKey, env.twitter.consumerSecret)
	// 	.set('Accept', 'application/json')
	// 	.expect(401)
	// 	.end(function(err, res){
	// 		// expect(res.body).to.have.property('statusCode');
	// 		// expect(res.body.statusCode).to.not.equal(null);
	// 		done();
	// 	});
	// });
});


// describe('List', function(){
// 	before(function(done){

// 	});

// 	it('test description', function(done)
// 	{

// 	})

//   //   User.find({}).remove(function() {
// 	 //      User.create({
// 	 //        provider: 'local',
// 	 //        name: 'Test User',
// 	 //        email: 'test@test.com',
// 	 //        password: 'test'
// 	 //      }, {
// 	 //        provider: 'local',
// 	 //        role: 'admin',
// 	 //        name: 'Admin',
// 	 //        email: 'admin@admin.com',
// 	 //        password: 'admin'
// 	 //      }, function() {
// 	 //          console.log('finished populating users');
// 	 //          server.post('/auth/local')
// 	 //            .send({email:'test@test.com', password:'test'})
// 	 //            .expect(302)
// 	 //            .end(function(err, res){
// 	 //              console.error('ERROR ' + JSON.stringify(err));
// 	 //              console.log('BODY ' + JSON.stringify(res.body));
// 	 //              token = res.body.token;
// 	 //              done();
// 	 //            })
// 	 //        }
// 	 //      );
// 	 //    });
//  	// });


// })





describe('GET /protected-resource authorized', function() {
	var agent = request.agent();
	
	beforeEach(function(done) {
		passportMock(app, {
			passAuthentication: true,
			userId: 1
		});

		supertest(app)
			.get('/mock/login')
			.end(function(err, result) {
				if (!err) {
					agent.saveCookies(result.res);
					done();
				} else {
					done(err);
				}
			});
	});

	it('should allow access to /protected-resource', function(done) {
		var req = request(app).get('/list');
		agent.attachCookies(req);
		req.expect(200, done);
	});
});


