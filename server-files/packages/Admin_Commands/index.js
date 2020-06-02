require("./admin");
mp.events.add("playerReady", player => {
    player.dimension = player.id + 20;
    player.call("showRegisterWindow");
});
mp.events.addCommand('money', (player) => {
    player.outputChatBox("Money: " + player.money);
});

mp.events.addCommand('updatemoney', (player, _, num) => {
    gm.mysql.handle.query('UPDATE `accounts` SET money = ? WHERE username = ?', [num, player.name], function (err, res) {
        if (!err) {
            player.money = num;
            player.outputChatBox("Money Updated");
        } else {
            console.log(err)
        }
    });
});



