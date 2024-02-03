DROP TABLE IF EXISTS policymakers;
CREATE TABLE policymakers (name TEXT, position TEXT, email TEXT, img TEXT, field TEXT);

DROP TABLE IF EXISTS fields;
CREATE TABLE fields (name TEXT, field TEXT);

INSERT INTO policymakers VALUE ("Raul Grijalva", "House", "(202) 225-2435", "", "Education");
INSERT INTO policymakers VALUE ("Maria Cantwell", "Senate", "(202) 228-0514", "", "Energy");
INSERT INTO policymakers VALUE ("Kevin Mullin", "House", "(202) 225-3531", "", "Technology");