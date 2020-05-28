require("./events/AccEvents");
global.DataBase = require ("./modules/DB");

DataBase.Connect(function(e) {
    if (!e) {
        console.log("\x1b[42m[DataBase]DataBase connection!\x1b[40m");
    } else {
        console.log("\x1b[41m[DataBase]DataBase connection ERROR \x1b[40m" + e);
    }
})