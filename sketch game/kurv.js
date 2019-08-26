class Kurv {
    constructor(x, y, bredde, dybde, speed, billede) {
        this.x = x;
        this.y = y; 
        this.bred = bredde + 50; //Kurvens bredde
        this.dyb = dybde + 25; //Kurvens dybde
        this.speed = speed;
        this.drawHitbox = true; //Boolean til at bestemmer hvorvidt hitboxes skal tegnes
        this.billede = billede;
    }

    tegn() {
        image(this.billede, this.x, this.y, this.bred, this.dyb); //Tegner selve kurven
    }



    grebet(xa, ya, yspeed, ra) {
        //Opsætter variabler således hitboxen kan ændres ved hjælp af variabler
        this.hitboxKurvMaxY = this.y+50;
        this.hitboxKurvMinY = this.y+8;
        this.hitboxKurvMaxX = this.x+this.bred;
        this.hitboxKurvMinX = this.x;

        this.hitboxObjectMaxY = ya + ra;
        this.hitboxObjectMinY = ya - ra;
        this.hitboxObjectMaxX = xa + ra;
        this.hitboxObjectMinX = xa - ra;

        if(this.drawHitbox) { //Her tegnes der hitboxes, så det nemt kan illustreres
           noFill();

           stroke(0, 255, 0);
           rect(this.hitboxKurvMinX, this.hitboxKurvMinY, dist(this.hitboxKurvMinX, 0, this.hitboxKurvMaxX, 0), dist(0, this.hitboxKurvMinY, 0, this.hitboxKurvMaxY));
   
           stroke(255, 0, 0);
           rect(this.hitboxObjectMinX, this.hitboxObjectMinY, dist(this.hitboxObjectMinX, 0, this.hitboxObjectMaxX, 0), dist(0, this.hitboxObjectMinY, 0, this.hitboxObjectMaxY));
   
           noStroke();
        }

        if (yspeed < 0) {
           if ((this.hitboxObjectMaxY < this.hitboxKurvMaxY && this.hitboxObjectMaxY > this.hitboxKurvMinY) && this.hitboxObjectMaxX >this.hitboxKurvMinX && this.hitboxObjectMaxX < this.hitboxKurvMaxX) { //Her checker vi om objektet og kurven overlapper, således at vi kan retunere true - Altså at objektet har ramt.
               return true; //Objekt rammer
           }
           else { //Hvis ikke overstående kriterie opfyldes:
               return false; //Objekt har ikke ramt
           }        
        }      
    }

    mouseMove(mouseXX, mouseYY) { //Skifter kurvens x og y koordinat til at være lig med musen
        if(mouseYY < height-200) {
            this.y = height-200;
        }
        else {
            this.y = mouseYY;
        }
        this.x = mouseXX;
    }

}