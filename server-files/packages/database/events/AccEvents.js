mp.events.addCommand("register", (player, _, login, password, reppassword, mail) => {
    if (login == undefined || password == undefined || reppassword == undefined || mail == undefined) return player.outputChatBox("/register [Login] [Password] [Repeat password] [Mail]");
    if (password != reppassword) return player.outputChatBox("Пароли не совподают!");
    DataBase.Handle.query("INSERT INTO accounts (login,pass,mail,socialClub,regIP,lastIP,regDate,lastDate) VALUES (?,?,?,?,?,?,NOW(),NOW())", [login, reppassword, mail, player.socialClub, player.ip, player.ip])
});

mp.events.addCommand("login", (player, _, login, password) => {
    if (login == undefined || password == undefined) return player.outputChatBox("/login [Login]");
    DataBase.Handle.query("SELECT login,pass FROM accounts WHERE login=? AND pass=?", [login, password], function (e, result) {
        if (result[0]) {
            DataBase.Handle.query("SELECT * FROM ban WHERE playerIP = ? AND socialClub = ?", [player.ip, player.socialClub], function(e, res) {
                if (res[0].playerIP == player.ip || res[0].socialClub == player.socialClub) {
                    player.outputChatBox("!{#ff6e6e}Ваш аккаунт заблокирован. Причина: " + res[0].reason);
                    player.outputChatBox("!{#ff6e6e}Адинистратором: " + res[0].admin);
                    player.kick();
                }
            });
            player.notify("~g~Вы успешно вошли в аккаунт, ~w~" + login);
            DataBase.Handle.query("UPDATE accounts SET lastIP=?,lastDate=NOW() WHERE login=?", [player.ip, login]);
        } else {
            player.notify("~r~Проверьте данные.");
        }
    });
})