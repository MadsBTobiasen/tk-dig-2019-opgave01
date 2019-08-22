class Objekt {
    constructor(x, y, xspeed, yspeed, rad, grav, billede, sound, kurv, point) {
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
        
        this.BILLEDE = billede;
        this.SOUND = sound;
        this.KURV = kurv;
        this.POINT = point;

        this.activeBool = false;
    }

    active(activeBool) {
        this.activeBool = activeBool;
        if(this.activeBool) { //Hvis objektet bliver aktiveret, bliver det også tegnet, og de tilhørende funktioner køres.
            this.tegn();
        }
    }
    
    tegn() {

        //Hvis objektet rammer den øvre kant, modvirker vi y-hastigheden, men fortsat lader gravity påvirke bolden.
    
        this.x += this.xspeed;
        this.y -= this.yspeed;
        this.yspeed -= this.GRAVITY;
        
        if(this.y < 50) {
            this.y -= this.yspeed - this.GRAVITY;
        }

        image(this.BILLEDE, this.x, this.y, this.RAD, this.RAD);

        if(this.yspeed < 0)
        {
            this.checkScore();
        }

    }
    
    checkScore() {

        if(this.yspeed < 0){ //Så længe objektet "falder", så kan det gribes.
            if(this.KURV.grebet(this.x, this.y, this.RAD)) { //Bliver objektet grebet.
                this.SOUND.play();
                this.SOUND.jump(2.5);
                this.POINT.score(this.POINT.currentStreak*1);
                this.POINT.hit();
                this.POINT.streak(true);

                //Resetter objektet til default værdier her.
                this.reset();
            }
            if(this.x > 600 || this.y > 750) { //Objektet falder ud af skærmen.
                this.POINT.score(-1);
                this.POINT.missed();
                this.POINT.streak(false);

                //Resetter objektet til default værdier her
                this.reset();
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