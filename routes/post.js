var express = require('express');
var router = express.Router();

router.get('/post', function(req, res, next){
	const {id} = req.query;
	var sql = "SELECT * FROM posts WHERE postId=?;";
	res.app.locals.pool.query(sql, [id], function(error, results, fields){
		let arr = results[0].tags.split(' ');
		results[0].tags_indiv = arr;
		console.log(results[0]);
		res.locals.id = id;
		res.locals.post = results[0];
		next();
	});
}, function(req, res, next){
	var sql = "SELECT * FROM comments WHERE postId=?;";
	res.app.locals.pool.query(sql, [res.locals.id], function(error, results, fields){
		res.locals.comments = results;
		next();
	});
}, function(req, res, next){
	var sql = "SELECT * FROM policymakers;";
	var tags = res.locals.post.tags_indiv;
	res.app.locals.pool.query(sql, function(error, results, fields){
		const lawmakers = [];
		results.forEach(elem => {
			let myField = elem.field;
			for(let i=0; i < tags.length; i++){
				if(myField.toLowerCase() == tags[i].toLowerCase()){
					lawmakers.push(elem);
				}
			}
		});
		console.log(lawmakers);
		res.render('3_post', {post: res.locals.post, policymakers: lawmakers, comments: res.locals.comments});
	});
});

router.get('/post', function(req, res, next){
	const {id} = req.query;
	var sql = "SELECT * FROM posts WHERE postId=?;";
	res.app.locals.pool.query(sql, [id], function(error, results, fields){
		res.locals.post = results[0];
		next();
	});
}, function(req, res, next){
	var sql = "SELECT * FROM policymakers;";
	res.app.locals.pool.query(sql, function(error, results, fields){
		res.render('3_post', {post: res.locals.post, policymakers: results});
	});
});

router.get('/add_comment', function(req, res, next){
	const {content, postId} = req.query;
	console.log(req.session.profile);
	var poster_raw = req.session.profile.email;
	var poster = poster_raw.slice(0, poster_raw.indexOf('@'));
	var sql = "INSERT INTO comments VALUE (?,?,?);";
	console.log(postId);
	console.log(content);
	console.log(poster);
	res.app.locals.pool.query(sql, [postId, content, poster], function(error, results, fields){
		res.send("Yay");
	});
});
module.exports = router;
