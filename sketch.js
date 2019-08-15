/*
Først laver vi et nogle variable til at lave en appelsin
 - en kugle som vi vil skyde afsted og fange i en turban
*/

// Appelsinen
var x = 0; 
var y = Math.floor (Math.random() * 550);
var rad = 20;
var xspeed = 4;
var yspeed = -10;
var newspeed;
var grav = 0.1; //Grav = Gravity, jo højere denne variable er, desto mere bliver appelsinen trukket ned.
var col = [200,100,0];

// Turbanen
var turban;
let turbanImg;
// Øvrige
var respawnTid = 50; //Respawn timer
var score = 0;
var antalRamt = 0;
var antalMiss = 0;
var currentStreak = 1;

/* 
 * 
 */

function preload() {
    soundFormats('mp3', 'ogg');
    turbanImg = loadImage('assets/turban.png');
    bombeImg = loadImage('assets/bombe.png')
    explosionSound = loadSound('assets/explosion.mp3');
}

function setup() {
    createCanvas(750, 600);
    newspeed = yspeed;
    x = rad;
    turban = new Kurv(670, 100, 70, 50, 10, turbanImg);
    explosionSound.setVolume(1);
}

function draw() {
    background(0);
    move();
    checkScore();
    display();

    turban.mouseMove(mouseX, mouseY);
}

function display() {
    fill(255);
    text("Score: "+score, width-80, 30);
    text("Streak: "+currentStreak, width-160, 30);
    text("Missed: "+antalMiss, width-240, 30);
    text("Hits: "+antalRamt, width-320, 30);
    //Her skal vi sørge for at appelsinen bliver vist, hvis den skal vises
    if(respawnTid > 0) {
        respawnTid -= 1;
    }
    if (respawnTid < 100) {
        fill(col);
        ellipse(x, y, rad*2, rad*2); //Appelsinen bliver tegnet
    }

    // Her vises turbanen - foreløbig blot en firkant
    turban.tegn();
}
    
function move() {
    //Her skal vi sørge for at appelsinen bevæger sig, hvis den er startet
    if (respawnTid <= 0) {
        x += xspeed;
        y += yspeed;
        yspeed += grav;
    }
    
    if (y < 50) {
        y -= yspeed - grav; //Hvis appelsinen rammer den øvre kant, modvirkesr vi y-hastigheden, men fortsat lader grav påvirke bolden.
    }
    if (x > width || y > height) { //Bliver kaldt når appelsinen forlader skærmen
        score -= 1; //Trækker frar score når man misser
        antalMiss += 1; //Tilføjer en enkel værdi til miss-variablen
        currentStreak = 1; //Resetter streak-variablen
        shootNew();
    }
}

function checkScore() {
    // Her checkes om turbanen har fanget appelsinen. Hvis ja, skydes en ny appelsin afsted
    if (turban.grebet(yspeed, x, y, rad)) {
        explosionSound.play();
        explosionSound.jump(2.5);
        score += currentStreak * 1; //Giver point når man rammer
        antalRamt += 1;
        currentStreak += 1; //Gør streak-varialen større når man rammer
        shootNew(); 
    }
}
    
function shootNew() {
    //Her skal vi sørge for at en ny appelsin skydes afsted 
    x = rad;
    y = 550;
    yspeed = newspeed;
    xspeed = 6*Math.random();

    //Laver en tilfældig respawn tid for appelsinen
    respawnTimer = (int) (Math.random() * 400);
}

function keyPressed() {
    /*
    turban.move(key);
    turban.speedController(keyCode);
    */
}

function mousePressed(){

}

/*
OPGAVER
 Opgave 1 - undersøg hvad variablerne  grav  og  tid  bruges til.
            Skriv det i kommentarer, prøv at se hvad der sker, når
            I laver dem om.
            



            
            *Done Grav - grav er en variable der definere tyngdekraften der bliver sat på appelsinen
            *Done Tid - tid er en respawn timer, en værdi over 100 angiver respawn tiden. Renamed tid -> respawnTimer

 Opgave 2 - lav programmet om så det er tilfældigt hvor højt oppe 
            på venstre kan appelsinerne starter. Overvej om man kan 
            sikre, at appelsinen ikke ryger ud af skærmens top men 
            stadig har en "pæn" bane

            *Done random spawn
            *Done øvre kant

 Opgave 3 - lav programmet om så man også kan bevæge turbanen mod
            højre og venstre med A- og D-tasterne. Prøv jer frem med
            forskellige løsninger for hvor hurtigt turbanen skal rykke

            *Done bevægelse med WASD
            *BONUS kan styre hastighed

 Opgave 4 - ret programmet til, så det også angives hvor mange 
            appelsiner man IKKE greb med turbanen

            *Done programmet tracker antal ramte / miss
            *BONUS minus point for miss
            *BONUS streaks giver flere point
                 
 Opgave 5 - Undersøg hvad scriptet  kurv.js  er og gør, samt hvad de 
            funktioner, scriptet indeholder, skal bruges til. Skriv 
            det som kommentarer oven over hver funktion. Forklar tillige,
            hvad sammenhængen mellem dette script og turbanen i hoved-
            programmet er, og forklar det med kommentarer i toppen af 
            kurv.js

            *Done kommenteret på kurv.js funktioner, til og med dem vi selv har lavet

 Opgave 6 - find et billede af en turban og sæt det ind i stedet 
            for firkanten. Find eventuelt også en lyd, der kan afspilles, 
            når appelsinen gribes. Se gerne i "p5 Reference" hvordan, 
            hvis ikke I kan huske det:   https://p5js.org/reference/
            Lav programmet om, så man kan flytte turbanen med musen

            *Done Turban har nu et billede
            *Done Lyd for point
            *Done kan nu flyttes med musen - Gammel kode der rykkede med WASD og speed med piltaster er kommenteret ud.

 Opgave 7 - lav en Appelsin-klasse, lige som der er en Kurv-klasse. 
            Flyt koden til appelsinen ud i et selvstændigt script.
            Overvej hvad det skal hedde, oghvilke variabler og funktioner, 
            der skal lægges over i det nye script, herunder hvordan det 
            kommer til at berøre turbanen. Skriv jeres overvejelser i 
            kommentarerne

 Opgave 8 - ret programmet til, så der kan være flere appelsiner i 
            luften på en gang, dvs. at der kan skydes en ny appelsin
            afsted før den foregående er forsvundet. Overvej hvordan 
            og hvor hurtigt de skal skydes af, og forklar jeres tanker
            i kommentarerne

 Opgave 9 - ret programmet til, så det kan vindes og/eller tabes ved
            at man griber eller misser et antal appelsiner. Sørg for 
            at der vises en "Game Over"-skærm, som fortæller om man 
            vandt eller tabte, og som giver mulighed for at starte et
            nyt spil.

*/