DROP TABLE IF EXISTS posts;
CREATE TABLE posts (postId INT, title TEXT, content TEXT, tags TEXT, likes INT, likeimg TEXT, poster TEXT);

DROP PROCEDURE IF EXISTS addPost;

DELIMITER $$

CREATE PROCEDURE addPost(IN post_title TEXT, IN post_content TEXT, IN post_tags TEXT, IN poster TEXT)
BEGIN

DECLARE nextId INT;

SELECT COUNT(1) INTO nextId FROM posts;
INSERT INTO posts
VALUE (nextId, post_title, post_content, post_tags, 0, "./img/thumb_blank.png", poster);

SELECT * FROM posts;

END $$


DELIMITER ;

CALL addPost("Renewable Energy and Green Technology", "The bill would impose a fee on the carbon content of fuels, including crude oil, natural gas, coal, or any other product derived from those fuels that will be used so as to emit greenhouse gases into the atmosphere.xemptions for fuels used for agricultural or nonemitting purposes, or imported.", "energy technology", 3);
CALL addPost("Clean Water and Air", "The objective of this Act is to restore and maintain the chemical, physical, and biological integrity of the Nation's waters.", "environment energy", 1);
CALL addPost("Lower Energy Costs", "Assess the supply of critical energy resources that are essential to the energy security of the United States and improve technology that reuses and recycles critical energy resources.", "energy", 3);
CALL addPost("Promote Resilient Buildings", "Amend certain laws relating to disaster recovery and relief with respect to the implementation of building codes, and for other purposes.", "transportation infrastructure safety", 1);