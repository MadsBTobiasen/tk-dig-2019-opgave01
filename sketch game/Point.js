class Point {
    constructor() {
        this.varScore = 0;
        this.currentStreak = 1;
        this.varMissed = 0;
        this.varHit = 0;
    }

    score(input) {
        this.varScore += input;
    }

    //Streak tager en boolean som input, hvis boolean er true, antager man at bolden har ramt, hvis false, antager man den har missed.
    streak(input) {
        if(input) {
            this.currentStreak += 1;
        }
        else
        {
            this.currentStreak = 1;
        }
    }

    missed() {
        this.varMissed += 1;
    }  

    hit() {
        this.varHit += 1;
    }

}