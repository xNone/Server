// Admins Commands
mp.events.addCommand('hp', (player) => {
    player.health = 100;
});
mp.events.addCommand('kill', (player, _, id) => {
    if (id == undefined) return player.outputChatBox("!{#c18013}/kill [ID]");
    let target = mp.players.at(id);
    if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
    target.health = player.health = 0;
});
mp.events.addCommand("sethp", (player, _, id, hp) => {
    if (id == undefined || hp == undefined) return player.outputChatBox("!{#c18013}/sethp [ID] [HP]");
    let target = mp.players.at(id);
    if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
    target.health = parseInt(hp);
});

mp.events.addCommand("setarm", (player, _, id, arm) => {
    if (id == undefined || arm == undefined) return player.outputChatBox("!{#c18013}/setarm [ID] [ARMOUR]");
    let target = mp.players.at(id);
    if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
    target.armour = parseInt(arm);
});

mp.events.addCommand("veh", (player, _, id, veh, color1, color2) => {
    if (id == undefined || veh == undefined) return player.outputChatBox("!{#c18013}/veh [ID] [Veh_Model] [Color#1] [Color#2]");
    let target = mp.players.at(id);
    if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
    let pos;
    pos = target.position;
    var mainVeh = mp.vehicles.new(mp.joaat(veh), new mp.Vector3(pos.x + 2, pos.y, pos.z));
    mainVeh.numberPlate = "ADMIN";
    // mainVeh = target.dimension;
    mainVeh.setColor(parseInt(color1), parseInt(color2));
});
mp.events.addCommand('plate', (player, _, plate) => {
    if (player.admin < 2) return player.outputChatBox("!{dodgerblue}[ОШИБКА] !{white}Вы не являетесь администратором.");
    if (player.vehicle) {
        player.vehicle.numberPlate = plate;
    }
});

mp.events.addCommand("repveh", (player, _, id) => {
    if (id == undefined) {
        if (!player.vehicle) return player.outputChatBox("!{#ff6e6e}Вы не в транспортном средстве.");
        if (player.vehicle) return player.outputChatBox("!{#57a643}Вы починили транспортное средство.");
        player.vehicle.repair();
    } else {
        let target = mp.players.at(id);
        if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
        target.vehicle.repair();
    }
});

mp.events.addCommand("pos", (player) => {
    let pos;
    pos = player.position;
    player.outputChatBox("!{#57a643}Ваши координаты:");
    player.outputChatBox("!{#eb5312}X: " + parseFloat(pos.x) + " !{#eb5312}Y: " + parseFloat(pos.y) + " !{#eb5312}Z: " + parseFloat(pos.z));
});

mp.events.addCommand("tppos", (player, _, x, y, z) => {
    if (x == undefined || y == undefined || z == undefined) return player.outputChatBox("!{#c18013}/tppos [X] [Y] [Z]");
    player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
    player.outputChatBox("!{#57a643}Вы телепортировались по координатам !{#eb5312}X: " + x + " !{#eb5312}Y: " + y + " !{#eb5312}Z: " + z);
});

mp.events.addCommand("setweather", (player, _, weather) => {
    if (weather == undefined) return player.outputChatBox("!{#c18013}/setweather [Weather]");
    mp.world.weather = weather;
});

mp.events.addCommand("setskin", (player, _, id, skin) => {
    if (id == undefined || skin == undefined) return player.outputChatBox("!{#c18013}/setskin [ID] [Skin]");
    let target = mp.players.at(id);
    if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
    target.model = mp.joaat(skin);
});

mp.events.addCommand("gh", (player, _, id) => {
    if (id == undefined) return player.outputChatBox("!{#c18013}/gh [ID]");
    let target = mp.players.at(id);
    if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
    target.dimension = player.dimension;
    target.position = player.position;
    player.outputChatBox("!{#57a643}Вы телепортировали к себе игрока с ID: " + target.id);
});

mp.events.addCommand("gt", (player, _, id) => {
    if (id == undefined) return player.outputChatBox("!{#c18013}/gt [ID]");
    let target = mp.players.at(id);
    if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
    player.dimension = target.dimension;
    player.position = target.position;
    player.outputChatBox("!{#57a643}Вы телепортировались к игроку с ID: " + target.id);
});

mp.events.addCommand("setdim", (player, _, id, dim) => {
    if (id == undefined || dim == undefined) return player.outputChatBox("!{#c18013}/setdim [ID] [Dimension]");
    let target = mp.players.at(id);
    if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
    target.dimension = parseInt(dim);
});

mp.events.addCommand("wdim", (player) => {
    player.outputChatBox("!{#c18013}Вы в " + "!{#ffffff}" + player.dimension + " !{#c18013}дименшине.");
});

mp.events.addCommand("kick", (player, _, id, reason) => {
    if (id == undefined || reason == undefined) return player.outputChatBox("!{#c18013}/kick [ID] [Reason]");
    let target = mp.players.at(id);
    var message = _.replace(id, "");
    if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
    mp.players.broadcast("!{#ff6e6e}Администратор " + player.name + " кикнул с сервера " + target.name + " Причина: " + message);
    target.kick();
});

mp.events.addCommand("banip", (player, _, id, reason) => {
    if (id == undefined || reason == undefined) return player.outputChatBox("!{#c18013}/banip [ID] [Reason]");
    let target = mp.players.at(id);
    var message = _.replace(id, "");
    if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
    mp.players.broadcast("!{#ff6e6e}Администратор " + player.name + " заблокировал " + target.name + " Причина: " + message);
    gm.mysql.handle.query("INSERT INTO banip (username,Admin,PlayerIP,reason) VALUES (?,?,?,?)", [target.name, player.name, target.ip, message]);
    target.kick();
});

mp.events.addCommand("bansc", (player, _, id, reason) => {
    if (id == undefined || reason == undefined) return player.outputChatBox("!{#c18013}/bansc [ID] [Reason]");
    let target = mp.players.at(id);
    var message = _.replace(id, "");
    if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
    mp.players.broadcast("!{#ff6e6e}Администратор " + player.name + " заблокировал " + target.name + " Причина: " + message);
    gm.mysql.handle.query("INSERT INTO bansc (username,Admin,PlayerIP,SocialClub,reason) VALUES (?,?,?,?,?)", [target.name, player.name, target.ip, target.socialClub, message]);
    target.kick();
});

mp.events.addCommand("hardban", (player, _, id, reason) => {
    if (id == undefined || reason == undefined) return player.outputChatBox("!{#c18013}/hardban [ID] [Reason]");
    let target = mp.players.at(id);
    var message = _.replace(id, "");
    if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
    mp.players.broadcast("!{#ff6e6e}Администратор " + player.name + " заблокировал " + target.name + " Причина: " + message);
    gm.mysql.handle.query("INSERT INTO hardban (username,Admin,PlayerIP,SocialClub,Hwid,reason) VALUES (?,?,?,?,?,?)", [target.name, player.name, target.ip, target.socialClub, target.serial, message]);
    target.kick();
});

mp.events.addCommand("inv", (player, _, inv) => {
    if (inv == undefined) return player.outputChatBox("!{#c18013}/inv [Num(0-255)]");
    player.alpha = parseInt(inv);
});

mp.events.addCommand("weapon", (player, _, id, weapon, ammo) => {
    if (id == undefined || weapon == undefined || ammo == undefined) return player.outputChatBox("!{#c18013}/weapon [ID] [Weapon] [Ammo]");
    let target = mp.players.at(id);
    if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
    target.giveWeapon(mp.joaat("weapon_" + weapon), parseInt(ammo));
});

mp.events.addCommand("gm", (player) => {
    player.call("gmON");
});
mp.events.addCommand("gmoff", (player) => {
    player.call("gmOFF");
});

mp.events.addCommand("freeze", (player, _, id) => {
    if (id == undefined) return player.outputChatBox("!{#c18013}/freeze [ID]");
    let target = mp.players.at(id);
    if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
    target.call("freezeON");
    player.outputChatBox("!{#57a643}Вы заморозили игрока с ID: " + target.id);
});
mp.events.addCommand("unfreeze", (player, _, id) => {
    if (id == undefined) return player.outputChatBox("!{#c18013}/unfreeze [ID]");
    let target = mp.players.at(id);
    if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
    target.call("freezeOFF");
    player.outputChatBox("!{#57a643}Вы разморозили игрока с ID: " + target.id);
});

mp.events.addCommand("re", (player, _, id) => {
    if (id != undefined) {
        let pos;
        pos = player.position;
        if (!player.lastps) player.lastps = {
            x: pos.x,
            z: pos.y+5,
            y: pos.z
        };
        let target = mp.players.at(id);
        if (target == null) return player.outputChatBox("!{#ff6e6e}Игрок с таким ID - не найдет.");
        if (player == target) return player.outputChatBox("!{#ff6e6e}Вы не можете следать за собой.");
        player.alpha = 0;
        player.position = target.position;
        player.dimension = target.dimension;
        player.call("reON", [target]);
    } else {
        player.call("reOFF");
        player.position = player.lastps;
        player.lastps = false;
        player.alpha = 255;
    }
});

mp.events.addCommand("setclothes", (player, _, id, component, drawable, texture, attach) => {
    if (component == undefined || drawable == undefined) return player.outputChatBox("!{#c18013}/setclothes [ID] [] []");
    player.setPropIndex(componentId, drawableId, TextureId, attach);
});