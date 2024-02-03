var express = require('express');
var router = express.Router();

router.get('/main', function(req, res, next){
	var sql = "SELECT * FROM posts ORDER BY likes DESC";
	res.app.locals.pool.query(sql, function(error, results, fields){
		results.forEach(elem => {
			console.log(elem.tags.split(' '));
			let arr = elem.tags.split(' ');
			elem.tags_indiv = arr;
		});
		res.render('2_main', {posts: results});
	});
});

router.get('/add_post', function(req, res, next){
	const {title, content} = req.query;
	console.log(title);
	console.log(content);
	var sql = "CALL addPost(?, ?, ?, ?);";
	res.app.locals.pool.query(sql, [title, content, "", req.session.profile.userId], function(error, results, fields){
		console.log("here are my results");
		console.log(results);
		res.render('2_main_partial', {posts: results});
	});
});

router.get('/increment_post', function(req, res, next){
	console.log("I got here");
	const {id} = req.query;
	var sql = "SELECT likes FROM posts WHERE postId=?;";
	res.app.locals.pool.query(sql, [parseInt(id)], function(error, results, fields){
		res.locals.id = id;
		res.locals.likes = results[0].likes;
		console.log(results[0].likes);
		next();
	});
}, function(req, res, next){
	var sql = "UPDATE posts SET likes=? WHERE postId=?;";
	res.app.locals.pool.query(sql, [res.locals.likes + 1, res.locals.id], function(error, results, fields){
		next();
	});
}, function(req, res, next){
	var sql = "UPDATE posts SET likeimg=? WHERE postId=?;";
	res.app.locals.pool.query(sql, ["./img/thumb_filled.png", res.locals.id], function(error, results, fields){
		res.send("Yay");
	});
});

router.get('/decrement_post', function(req, res, next){
	console.log("I got here");
	const {id} = req.query;
	var sql = "SELECT likes FROM posts WHERE postId=?;";
	res.app.locals.pool.query(sql, [parseInt(id)], function(error, results, fields){
		res.locals.id = id;
		res.locals.likes = results[0].likes;
		console.log(results[0].likes);
		next();
	});
}, function(req, res, next){
	var sql = "UPDATE posts SET likes=? WHERE postId=?;";
	res.app.locals.pool.query(sql, [res.locals.likes - 1, res.locals.id], function(error, results, fields){
		next();
	});
}, function(req, res, next){
	var sql = "UPDATE posts SET likeimg=? WHERE postId=?;";
	res.app.locals.pool.query(sql, ["./img/thumb_blank.png", res.locals.id], function(error, results, fields){
		res.send("Yay");
	});
});
module.exports = router;
