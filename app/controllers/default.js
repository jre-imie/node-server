var express     = require('express'),
	MongoClient = require('mongodb').MongoClient,
	router      = express.Router();

router.get('/add', function (req, res, next) {
	MongoClient.connect('mongodb://localhost:27017/dockerTest', function(err, db) {
		if (err) {
			return console.log(err);
		}

		var collection = db.collection('connexionsToAdd'),
			object     = {
				url      : '/add',
				utsCreate: new Date(),
				utsUpdate: new Date()
			}

		collection.insert(object, {w : 1}, function(err, result) {
			console.log(err);
			console.log(result);

			collection.count(function(err, count) {
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(count));

				db.close();
			});
		});
	});
});

module.exports = router;
