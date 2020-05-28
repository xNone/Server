var mysql = require ("mysql");

module.exports = {
    Handle: null,
    Connect: function(callback) {
        this.Handle = mysql.createPool({
            connectionLimit: 100,
            host: "localhost",
            user: "root",
            password: "",
            database: "rights",
            debug: false
        });
        callback();
    },
};