var should = require('chai').should(),
	expect = require('chai').expect,
	request = require('supertest'),
	superagent = require('superagent'),
	env = require('../env/config'),	
	app = require('../server');

	// var server = request(app);

// describe('User', function(){
// 	it('unauthorized users should return a 401 response', function(done){
// 		api.get('/user/me')
// 		.set('Accept', 'application/json')
// 		.expect(401)
// 		.end(function(err, res){
// 			// expect(res.body).to.have.property('statusCode');
// 			// expect(res.body.statusCode).to.not.equal(null);
// 			done();
// 		});
// 	});
// });

//created test user in db
describe('authorized user', function(){
	var user = { username : 'test', password : 'test'};

	// before('testees', function(done){
	// 	request(app).post('/user/login')
	// 	.send(user)
	// 	.set('Accept', 'application/json')
	// 	.expect(200)
	// 	.end(function(err, res){
	// 		console.log(res);
	// 		done();
	// 	});
	// });


	// before(function(done){
	// 	console.log('gets to before')
	// 	request(app).post('/user/login')
	//       .set('Accept', 'application/json')
	//       .expect(200)
	//       .end(function(err, res)
	//       {
	//       		console.log(res.body);
	//       		if(err) throw err;
	//       		done();
	//       })
	// });




	// var  list = { name: 'test list' };

	// it('should post to list', function(done){
	// 	api.post('/list')
	// 	// .set('Accept', 'application/json')
 //  //     	.expect('Content-Type', /json/)
 //      	.send(list)
	// 	.end(function(err, res){
	// 		console.log(res);
	// 		console.log("error: " + err);
	// 		// expect(res.body).to.have.property('status');
	// 		// expect(res.body.status).to.equal('saved');
	// 		done();
	// 	});
	// });


	it('should get to list', function(done){
		request(app).get('/list')
			// .set('Connection', 'keep-alive')
			.set('Accept', 'application/json')
		    // .expect('Content-Type', /json/)
		    .expect(200)
			.end(function(err, res){	
				console.log('gets here');
				console.log(res);
				// console.log("get error: " + err);
				// expect(res.body).to.have.property('status');
				// expect(res.body.status).to.equal('saved');
				done();
			});
	});

	// after(function(done)
	// {
	// 	done();
	// 	// api.post('/list')
	// 	// .set('Accept', 'application/json')
	// 	// .send(list)
	// 	// .expect(200)
	// 	// .end(function(err, res){
	// 	// 	// expect(res.body).to.have.property('statusCode');
	// 	// 	// expect(res.body.statusCode).to.not.equal(null);
	// 	// 	done();
	// 	// });
	// });
});


