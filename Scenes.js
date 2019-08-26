class Scenes {
    constructor(kurvBillede, objektImg, pointSound) {
        this.kurvBillede = kurvBillede;
        this.objektImg = objektImg;
        this.pointSound = pointSound;

        this.kurv;
        this.point;
        this.objekter = [];
    }

    initiate() {
        this.point = new Point();
        this.kurv = new Kurv(670, 100, 70, 50, 10, this.kurvBillede);

        var antalBomberAtLave = 5;
        for(var i = 0; i<antalBomberAtLave; i++) { 
            var randomGrav = Math.floor(Math.random() * 3 + 1) / 10;
            this.objekter[i] = new Objekt(50, 550, 4, 10, 25, randomGrav, this.objektImg, this.pointSound, this.kurv, this.point);
        }
    }

    
    //////////////////////// SPIL-SCENE OG DETS TILHØRENDE FUNKTIONER ////////////////////////

    gameScene() {
        this.gameDisplay();
        this.gameMover();
        this.gameObjekter();
    }

    gameDisplay() {
        fill(255);

        text("Score: "+this.point.varScore, width-80, 30);
        text("Streak: "+this.point.currentStreak, width-160, 30);
        text("Missed: "+this.point.varMissed, width-240, 30);
        text("Hits: "+this.point.varHit, width-320, 30);
    
        this.kurv.tegn();
    }

    gameMover() {
        this.kurv.mouseMove(mouseX, mouseY);
    }

    gameObjekter() {
        this.objekter[0].active(true);
        this.objekter[1].active(true);
        this.objekter[2].active(true);
        this.objekter[3].active(true);
        this.objekter[4].active(true);
    }

    //////////////////////// SPIL-SCENE OG DETS TILHØRENDE FUNKTIONER ////////////////////////
}