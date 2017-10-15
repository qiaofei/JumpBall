var GameStateManager = pc.createScript('GameStateManager');

// initialize code called once per entity
GameStateManager.prototype.initialize = function() {
    var app = this.app;
    
    var player =app.root.findByName('player');
    this.playercontrol = player.script.PlayerControl;
    
    this.start = false;
    this.startgame = false;
    this.lose = false;
    this.playtimer = 0.3;
   
    initHandle();
};

GameStateManager.prototype.update = function(dt) {
    if(!this.start || !this.startgame)
    {
        return;
    }
    if(this.lose)
    {
        return;
    }
    
    this.playtimer += dt;
    
};

GameStateManager.prototype.GameStart = function()
{
    gameAction.gameStart();
};

GameStateManager.prototype.GameStartGame = function()
{
    gameAction.start();
};

GameStateManager.prototype.GameEnd = function()
{
    
    var scoreinfo={"score":this.playercontrol.score,'usermask':parseInt(this.playtimer).toString(8)};
    
    var scores = encryptscore(JSON.stringify(scoreinfo),window.token).toString()
    
    scoreinfo.scores = scores;
    
    gameAction.gameEnd(scoreinfo);
    
};

GameStateManager.prototype.Init = function()
{
            gameAction.gameInit();
    this.playtimer = 0;  
    this.startgame = false;
    this.lose = false;
};