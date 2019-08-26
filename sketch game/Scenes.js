class Scenes {
    constructor(kurvBillede, objektImg, pointSound) {
        this.kurvBillede = kurvBillede;
        this.objektImg = objektImg;
        this.pointSound = pointSound;

        this.kurv;
        this.point;
        this.objekter = [];
    }

    initiate(antalObjekterAtLave) {
        this.point = new Point();
        this.kurv = new Kurv(670, 100, 70, 50, 10, this.kurvBillede);

        for(var i = 0; i<antalObjekterAtLave; i++) { 
            var randomGrav = Math.floor(Math.random() * 3 + 1) / 10;
            this.objekter[i] = new Objekt(50, 550, 6*Math.random(), 10, 25, randomGrav, this.objektImg, this.pointSound, this.kurv, this.point);
        }
    }

    
    //////////////////////// SPIL-SCENE OG DETS TILHØRENDE FUNKTIONER ////////////////////////

    gameScene() {
        this.gameDisplay();
        this.gameMover();
        this.gameObjekter();
    }

    gameDisplay() {
        background(0);

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
        if(this.point.varScore < 999999) {
            for(var i = 0; i<this.objekter.length; i++) {
                this.objekter[i].active(true);
            }
        }
    }

    //////////////////////// PAUSE-SCENE OG DETS FUNKTIONER ////////////////////////

    pauseScene() {
        fill(255, 105, 180);
        text("Game Paused", width/2-50, height/2);
    }

    //////////////////////// MENU-SCENE OG DETS FUNKTIONER ////////////////////////

    menuScene() {
        fill(255, 105, 180);
        text("GAME PLEASE", width/2, height/2);
    }
}