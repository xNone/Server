var player = mp.players.local;

mp.events.add("gmON", () => {
    player.setInvincible(true);
});
mp.events.add("gmOFF", () => {
    player.setInvincible(false);
});
mp.events.add("freezeON", () => {
    player.freezePosition(true);
});
mp.events.add("freezeOFF", () => {
    player.freezePosition(false);
});
mp.events.add("reON", entity => {
    player.attachTo(entity.handle, -1, -1.5, -1.5, 2, 0, 0, 0, true, false, false, false, 0, false);
    player.freezePosition(true);
});
mp.events.add("reOFF", () => {
    player.detach(true, true);
    player.freezePosition(false);
});