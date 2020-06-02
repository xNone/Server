global.gm = {};

gm.mysql = require('./mysql.js');
gm.auth = require('./auth.js');

gm.mysql.connect(function() { });
