var twitterStrategy = {
	consumerKey: "15k4F26hVvP0F6vjvDCVkw",
	consumerSecret: "MGdqxBUI0lLoLc7KZYnW0xRNPAfpUL9diWFLU559lA",
	// callback: 'http://192.168.0.3:3000/auth/twitter/callback'
	callback: 'http://localhost:3000/auth/twitter/callback'

}
  
// "http://192.168.0.3:3000/auth/twitter/callback"
var config = {
	twitter: twitterStrategy,
	mongooseURL: 'mongodb://localhost/todo',
	isAuthenticated: function(req, res, next)
	{
		 if (req.isAuthenticated()) { 
		 	return next(); 
		 }
		console.log('is not isAuthenticated');
		res.send({'statusCode': '-1'})
	}
}
module.exports = config;