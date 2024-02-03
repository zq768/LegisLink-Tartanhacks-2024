var express = require('express');
var router = express.Router();

router.get('/user', function(req, res, next){
	var sql = "SELECT * FROM posts WHERE poster=?;";
	console.log(req.session.profile.userId);
	res.app.locals.pool.query(sql, [req.session.profile.userId], function(error, results, fields){
		const recommends = ["Clean Water and Air", "National Park Conservation", "Space Debris Cleanup", "Ocean Conservation and Protection"];
		res.render('4_user', {posts: results, user: req.session.profile, recs: recommends});
	});
});
module.exports = router;
