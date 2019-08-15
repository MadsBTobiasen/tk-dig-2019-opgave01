/*
 * Dette script definerer klassen Kurv
*/

function Kurv(x, y, bredde, dybde, speed, billede) {
    /* Den første del af funktionen er en "konstruktør".
     * Den tager parametrene og konstruerer et nyt objekt 
     * ud fra dem. Værdierne huskes som hørende til netop 
     * dette objekt ved hjælp af nøgleordet this
     */
    
    this.x = x;
    this.y = y; 
    this.bred = bredde + 50; //Kurvens bredde
    this.dyb = dybde + 25; //Kurvens dybde
    this.speed = speed;
    this.drawHitbox = true; //Boolean til at bestemmer hvorvidt hitboxes skal tegnes

    //Tegner kurven
    this.tegn = function() {
        image(billede, this.x, this.y, this.bred, this.dyb); //Tegner selve kurven
        fill(255, 255, 255); //Hvid farve
        text("Speed: "+this.speed, width-80, height-30); //Tegner kurvens hastighed
    }

    //Funktion der gør at kurven kan bevæges, men forskellige taste-input
    this.move = function(tast) {
        if (tast == 'w' || tast== 'W') { //Styrer med W
            this.y -= this.speed;
            if (this.y < 0) {this.y = 0};
        }
        if (tast == 's' || tast == 'S') { //Styrer med S
            this.y += this.speed;
            if (this.y > height-this.dyb) {this.y = height - this.dyb};
        }
        if (tast == 'a' || tast == 'A') { //Styrer med A
            this.x -= this.speed;
        }
        if (tast == 'd' || tast == 'D') { //Styrer med D
            this.x += this.speed;
        }
    }

    //Funktion der gør at man kan bestemme kurvens hastighed, som den bevæger sig med
    this.speedController = function(tast) {
        if (tast == 38 || tast == 39) { //Keycode-formen benyttes således at piletasterne kan styre hastigeheden. Op -og højrepil øger hastigheden
            this.speed += 10;
            if (this.speed <= 10) { this.speed = 10; }
            if (this.speed >= 60) { this.speed = 50; }
        }
        if (tast == 37 || tast == 40) { // Ned -og venstrepil sænker hastigheden.
            this.speed -= 10;
            if (this.speed <= 10) { this.speed = 10; }
            if (this.speed >= 60) { this.speed = 50; }
        }
    }

    //Funktion der registrere om appelsinen er grebet af kurven, funktionen returnere true / false, alt efter om appelsinen ramte i kurven
    this.grebet = function(yspeed, xa, ya, ra) {

        //Opsætter variabler således de kan ændres ved hjælp af variabler
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

        if (yspeed > 0) { //Objektet kan kun gribes hvis objektet er igang med at falde ned
            if ((this.hitboxObjectMaxY < this.hitboxKurvMaxY && this.hitboxObjectMaxY > this.hitboxKurvMinY) && this.hitboxObjectMaxX >this.hitboxKurvMinX && this.hitboxObjectMaxX < this.hitboxKurvMaxX) { //Her checker vi om objektet og kurven overlapper, således at vi kan retunere true - Altså at objektet har ramt.
                return true; //Objekt rammer
            }
            else { //Hvis ikke overstående kriterie opfyldes:
                return false; //Objekt har ikke ramt
            }        
        }

    }

} 