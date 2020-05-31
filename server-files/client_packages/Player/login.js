var browser1 = mp.browsers.new("package://Sing/sing.html");

mp.events.add("showRegisterWindow", () => {
    let sceneryCamera = mp.cameras.new("default", new mp.Vector3(1155.79, -2150.96, 598.32), new mp.Vector3(0, 0, 0), 40);
    sceneryCamera.pointAtCoord(1155.79, -2150.96, 598.32);
    sceneryCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    player.freezePosition(true);
    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);
    mp.gui.cursor.visible = true;
    mp.game.ui.displayRadar(false);
    player.alpha = 0;
});

mp.events.add("loginDataToServer", (username, password, Mail, state) => {
    mp.events.callRemote("sendDataToServer", username, password, Mail, state);
});
mp.keys.bind(0x71, true, function () {   // F2 ON/OFF cursor
    if (mp.gui.cursor.visible != true) {
        mp.gui.cursor.visible = true;
    } else {
        mp.gui.cursor.visible = false;
    }
});

mp.events.add("loginHandler", (handle) => {
    switch(handle){
        case "success":
        {
            browser1.destroy();
            mp.game.graphics.notify("~g~Вы успешно вошли в аккаунт.");
            player.freezePosition(false);
            mp.gui.chat.activate(true);
            mp.gui.chat.show(true);
            mp.gui.cursor.visible = false;
            mp.game.ui.displayRadar(true);
            player.alpha = 255;
            mp.game.cam.renderScriptCams(false, false, 0, false, false);
            break;
        }
        case "registered":
        {
            browser1.destroy();
            mp.game.graphics.notify("~g~Вы успешно зарегистрировали аккаунт.");
            player.freezePosition(false);
            mp.gui.chat.activate(true);
            mp.gui.chat.show(true);
            mp.gui.cursor.visible = false;
            mp.game.ui.displayRadar(true);
            player.alpha = 255;
            mp.game.cam.renderScriptCams(false, false, 0, false, false);
            player.position = new mp.Vector3(-1041.43, -2743.91, 21.35);
            break;
        }
        case "takeninfo":
        {
            browser1.execute(`$(".taken-info").show(); $("#registerButton").show();`);
            break;
        }
        case "taken2info":
        {
            browser1.execute(`$(".taken2-info").show(); $("#registerButton").show();`);
            break;
        }
        case "taken3info":
        {
            browser1.execute(`$(".taken3-info").show(); $("#registerButton").show();`);
            break;
        }
        case "incorrectinfo":
        {
            browser1.execute(`$(".incorrect-info").show(); $("#loginButton").show();`);
            break;
        }
        case "tooshortlogin":
        {
            browser1.execute(`$(".short-login").show(); $("#registerButton").show();`);
            break;
        }
        case "toolonglogin":
        {
            browser1.execute(`$(".long-login").show(); $("#registerButton").show();`);
            break;
        }
        case "tooshortpass":
        {
            browser1.execute(`$(".short-pass").show(); $("#registerButton").show();`);
            break;
        } 
        case "toolongpass":
        {
            browser1.execute(`$(".long-pass").show(); $("#registerButton").show();`);
            break;
        }
        case "tlban":
        {
            browser1.execute(`$(".lban").show();  $("#loginButton").show();`);
            // mp.events.add("sbanip", (reason) => {
            //     mp.events.callRemote("cbanip", reason);
            //     mp.game.graphics.notify("~r~Ваш аккаунт заблокирован. Причина: " + reason);
            // });
            break;; 
        }
        case "trban":
        {
            browser1.execute(`$(".rban").show();  $("#registerButton").show();`);
            // mp.events.add("sbanip", (reason) => {
            //     mp.events.callRemote("cbanip", reason);
            //     mp.game.graphics.notify("~r~Ваш аккаунт заблокирован. Причина: " + reason);
            // });
            break;;
        }
        default:
        {
            break;
        }
    }
});
