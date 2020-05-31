var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

module.exports =
{
    handle: null,

    connect: function(call){
        this.handle = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'server_db'
        });

        this.handle.connect(function (err){
            if(err){
                switch(err.code){
                    case "ECONNREFUSED":
                        console.log("\x1b[93m[MySQL] \x1b[97mError: Check your connection details (packages/mysql/mysql.js) or make sure your MySQL server is running. \x1b[39m");
                        return;
                        break;
                    case "ER_BAD_DB_ERROR":
                        console.log("\x1b[91m[MySQL] \x1b[97mError: The database name you've entered does not exist. \x1b[39m");
                        return;
                        break;
                    case "ER_ACCESS_DENIED_ERROR":
                        console.log("\x1b[91m[MySQL] \x1b[97mError: Check your MySQL username and password and make sure they're correct. \x1b[39m");
                        return;
                        break;
                    case "ENOENT":
                        console.log("\x1b[91m[MySQL] \x1b[97mError: There is no internet connection. Check your connection and try again. \x1b[39m");
                        return;
                        break;
                    default:
                        console.log("\x1b[91m[MySQL] \x1b[97mError: " + err.code + " \x1b[39m");
                        return;
                        break;
                }
            } else {
                console.log("\x1b[92m[MySQL] \x1b[97mConnected Successfully \x1b[39m");
            }
        });
    }
};

mp.events.add("sendDataToServer", (player, username, password, Mail, state) => {
    switch(state){
        case 0: //Login State
        {
            gm.mysql.handle.query("SELECT * FROM hardban WHERE username = ? OR PlayerIP = ? OR SocialClub = ? OR Hwid = ?", [username, player.ip, player.socialClub, player.serial], function (e, res1) {
                if (res1[0]) {
                    layer.call("loginHandler", ["tlban"]);
                    setTimeout(function () {
                        player.kick();
                    }, 1000)
                } else {
            //Check Ban SocialClub
            gm.mysql.handle.query("SELECT * FROM bansc WHERE username = ? OR PlayerIP = ? OR SocialClub = ?", [username, player.ip, player.socialClub], function (e, res2) {
                if (res2[0]) {
                    player.call("loginHandler", ["tlban"]);
                    setTimeout(function () {
                        player.kick();
                    }, 1000)
                } else {
            //Check Ban IP 
            gm.mysql.handle.query("SELECT * FROM banip WHERE username = ? OR PlayerIP = ?", [username, player.ip], function (e, res3) {
                if (res3[0]) { // Ban
                    player.call("loginHandler", ["tlban"]);
                    setTimeout(function () {
                        player.kick();
                    }, 1000)
                    // Dont work - input reason
                    mp.events.add("cbanip", (reason) => {
                        gm.mysql.handle.query("SELECT * FROM banip WHERE Admin = ? AND reason = ?", [player.id, reason]);
                        player.call("sbanip", "reason");
                    })
                    player.call("sbanip", "reason");
                    //
                    // No ban
                } else {
                    gm.mysql.handle.query('SELECT `password` FROM `accounts` WHERE `username` = ?', [username], function(err, res){
                        if(res.length > 0){
                            let sqlPassword = res[0]["password"];
                            bcrypt.compare(password, sqlPassword, function(err, res2) {
                                if(res2 === true){  //Password is correct
                                    player.call("loginHandler", ["success"]);
                                    player.dimension = 0;
                                    gm.auth.loadAccount(player);
                                    player.name = username;
                                    gm.mysql.handle.query('UPDATE `accounts` SET `LastIP` = ?, `LastDate` = NOW() WHERE `username` = ?', [player.ip, username]);
                                } else {    //Password is incorrect
                                    player.call("loginHandler", ["incorrectinfo"]);
                                }
                            });
                        } else {
                            player.call("loginHandler", ["incorrectinfo"]);
                        }
                        
                    });
                        }

            });
            }
            });
                }
            });
            break;
        }
        case 1: //Register State
        {
            gm.mysql.handle.query("SELECT * FROM hardban WHERE username = ? OR PlayerIP = ? OR SocialClub = ? OR Hwid = ?", [username, player.ip, player.socialClub, player.serial], function (e, res1) {
                if (res1[0]) {
                    layer.call("loginHandler", ["trban"]);
                    setTimeout(function () {
                        player.kick();
                    }, 1000)
                } else {
                    //Check Ban SocialClub
                    gm.mysql.handle.query("SELECT * FROM bansc WHERE username = ? OR PlayerIP = ? OR SocialClub = ?", [username, player.ip, player.socialClub], function (e, res2) {
                        if (res2[0]) {
                            player.call("loginHandler", ["trban"]);
                            setTimeout(function () {
                                player.kick();
                            }, 1000)
                        } else {
                            //Check Ban IP 
                            gm.mysql.handle.query("SELECT * FROM banip WHERE username = ? OR PlayerIP = ?", [username, player.ip], function (e, res3) {
                                if (res3[0]) { // Ban
                                    player.call("loginHandler", ["trban"]);
                                    setTimeout(function () {
                                        player.kick();
                                    }, 1000)
                                    // Dont work - input reason
                                    // mp.events.add("cbanip", (reason) => {
                                    //     gm.mysql.handle.query("SELECT * FROM banip WHERE Admin = ? AND reason = ?", [player.id, reason]);
                                    //     player.call("sbanip", "reason");
                                    // })
                                    // player.call("sbanip", "reason");
                                    //
                                    // No ban
                                // Short login
                                if (username.length >= 4){
                                    // Short password
                                    if ((password.length >= 6)) {
                                        //Long login
                                        if (username.length <= 16) {
                                            //Long password
                                            if (password.length <= 24) {
                                                gm.mysql.handle.query('SELECT * FROM `accounts` WHERE `username` = ? OR `Mail` = ? OR `SocialClub` = ?', [username, Mail, player.socialClub], function(err, res){
                                                    if(res[0].username == username) {
                                                        player.call("loginHandler", ["takeninfo"]);
                                                    } else {
                                                        if (res[0].Mail == Mail) {
                                                            player.call("loginHandler", ["taken2info"]);
                                                        } else {
                                                            if (res[0].SocialClub == player.socialClub) {
                                                                player.call("loginHandler", ["taken3info"]);
                                                            } else {
                                                        bcrypt.hash(password, null, null, function(err, hash) {
                                                            if(!err){
                                                                gm.mysql.handle.query('INSERT INTO `accounts` SET `username` = ?, `password` = ?, `Mail` = ?, `SocialClub` = ?, `RegisterIP` = ?, `LastIP` = ?, `RegisterDate` = NOW(), `LastDate` = NOW()', [username, hash, Mail, player.socialClub, player.ip, player.ip], function(err, res){
                                                                    if(!err){
                                                                        player.call("loginHandler", ["registered"]);
                                                                        console.log("[\x1b[39mRegister]\x1b[92m" + username + "\x1b[39m has just registered.");
                                                                        player.dimension = 0;
                                                                    } else {
                                                                        console.log("\x1b[31m[Register-ERROR] " + err)
                                                                    }
                                                                });
                                                            } else {
                                                                console.log("\x1b[31m[BCrypt]: " + err)
                                                            }
                                                        });
                                                            }
                                                        }
                                                    }
                                                });
                                            } else {
                                                player.call("loginHandler", ["toolongpass"]);
                                            }
                                            } else {
                                                player.call("loginHandler", ["toolonglogin"]);
                                            }
                                } else {
                                    player.call("loginHandler", ["tooshortpass"]);
                                }
                            } else {
                                player.call("loginHandler", ["tooshortlogin"]);
                            }
                            }
                            });
                            }
                            });
                            }
                            });
                            break;
                        }
                        default:
                        {
                            player.outputChatBox("An error has occured, please contact your server administrator.")
                            console.log("\x1b[31m[ERROR] Login/Register state was one that isn't defined. State: " + state)
                            break;
                        }
                    }
});

