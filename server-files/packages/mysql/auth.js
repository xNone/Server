module.exports =
{
    saveAccount: function(player){
        gm.mysql.handle.query('UPDATE `accounts` SET money = ? WHERE username = ?', [player.money, player.name], function(err, res, row){});
    },
    loadAccount: function(player){
        gm.mysql.handle.query('SELECT * FROM `accounts` WHERE username = ?', [player.name], function(err, res, row){
            if(res.length){
                res.forEach(function(playerData){
                    player.name = playerData.username;
                    player.money = playerData.money;
                });
            }
        });
        console.log(player.name + " has logged")
        player.outputChatBox("Data Loaded.")
    }
}