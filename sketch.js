/*
Først laver vi et nogle variable til at lave en appelsin
 - en kugle som vi vil skyde afsted og fange i en turban
*/

// Øvrige
var respawnTid = 50; //Respawn timer
var score = 0;
var antalRamt = 0;
var antalMiss = 0;
var currentStreak = 1;
var currentScene = 1;


function preload() {
    soundFormats('mp3', 'ogg');
    turbanImg = loadImage('assets/turban.png');
    bombeImg = loadImage('assets/bombe.png')
    explosionSound = loadSound('assets/explosion.mp3');
}

function setup() {
    createCanvas(1000, 900);
    turban = new Kurv(670, 100, 70, 50, 10, turbanImg);
    scene = new Scenes(turbanImg, bombeImg, explosionSound)
    scene.initiate();
    explosionSound.setVolume(1);
}

function draw() {

    background(0);

    switch (currentScene) {
        case 0:
            fill(255, 105, 180);
            text("GAME PLEASE", width/2, height/2);
            break;
        case 1:
            scene.gameScene();
            break;
    }

}

function keyPressed() {
    if(key == 0) {
        currentScene = 0;
    }
    if(key == 1) {
        currentScene = 1;
    }
}

function mousePressed() {

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
            *BONUS Kurv nu i ecmascript6

 Opgave 7 - lav en Appelsin-klasse, lige som der er en Kurv-klasse. 
            Flyt koden til appelsinen ud i et selvstændigt script.
            Overvej hvad det skal hedde, oghvilke variabler og funktioner, 
            der skal lægges over i det nye script, herunder hvordan det 
            kommer til at berøre turbanen. Skriv jeres overvejelser i 
            kommentarerne

            //Rykket Appelsinen ind i Objekt klasse, således der kan kreeres flere appelsiner på en gang.

 Opgave 8 - ret programmet til, så der kan være flere appelsiner i 
            luften på en gang, dvs. at der kan skydes en ny appelsin
            afsted før den foregående er forsvundet. Overvej hvordan 
            og hvor hurtigt de skal skydes af, og forklar jeres tanker
            i kommentarerne

            //Appelsiner kan nu være flertallige på skærmen.

 Opgave 9 - ret programmet til, så det kan vindes og/eller tabes ved
            at man griber eller misser et antal appelsiner. Sørg for 
            at der vises en "Game Over"-skærm, som fortæller om man 
            vandt eller tabte, og som giver mulighed for at starte et
            nyt spil.

*/