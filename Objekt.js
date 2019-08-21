class Objekt {
    constructor(x, y, xspeed, yspeed, rad, grav, respawnTimer, billede, sound, kurv) {
        //Variables fra constructor
        //Koordinator
        this.DEFAULTX = x; //Start positionen for x.
        this.DEFAULTY = y; //Start positionen for y.
        this.x = x;
        this.y = y;

        //Hastighed
        this.DEFAULTYSPEED = yspeed;
        this.xspeed = xspeed;
        this.yspeed = yspeed;
        this.GRAVITY = grav;

        this.RAD = rad;
        this.respawnTimer = respawnTimer;
        
        this.BILLEDE = billede;
        this.SOUND = sound;
        this.KURV = kurv;

        this.activeBool = false;
    }

    active(activeBool) {
        this.activeBool = activeBool;
        if(this.activeBool) { //Hvis objektet bliver aktiveret, bliver det også tegnet, og de tilhørende funktioner køres.
            tegn();
        }
    }
    
    tegn() {

        //Hvis objektet rammer den øvre kant, modvirker vi y-hastigheden, men fortsat lader gravity påvirke bolden.
         if(this.y < 50) {
            this.y -= this.yspeed - this.GRAVITY;
        }

        checkScore();

    }
    
    checkScore() {

        if(this.yspeed > 0){ //Så længe objektet "falder", så kan det gribes.
            if(this.KURV.grebet(this.x, this.y, this.RAD)) { //Bliver objektet grebet.
                SOUND.play();
                SOUND.jump(2.5);
                //SCORE ADD HERE
                //AMOUNT HIT ADD HERE
                //STREAK ADD HERE

                //Resetter objektet til default værdier her
                reset();
            }
            if(this.x > width || this.y > height) { //Objektet falder ud af skærmen.
                //SCORE SUBTRACT HERE
                //AMOUNT MISS ADD HERE
                //STREAK RESET HERE

                //Resetter objektet til default værdier her
                reset();
            }
        }

    }

    reset() {
        this.activeBool = false;
        this.yspeed = this.DEFAULTYSPEED;
        this.xspeed = 6*Math.random();
        this.y = this.DEFAULTY;
        this.x = this.DEFAULTX;
    }


}