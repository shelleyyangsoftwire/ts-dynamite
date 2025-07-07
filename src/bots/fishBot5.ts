import { Gamestate, BotSelection } from '../models/gamestate';

// improvement upon bot 2 -- uses bombs when falling behind
class Bot {
    // dynamite count
    public dynamiteCount :number;
    public scores :number [];
    public carry :number;
    public constructor() {
        this.dynamiteCount = 0;
        this.scores = [0,0];
        this.carry = 1;
    }


    // takes the gamestate, outputs each bot selection
    //this.string asBotselection
    makeMove(gamestate: Gamestate): BotSelection {
        let moves: BotSelection[] = ['R', 'P', 'S', 'D'];
        let thisMove: BotSelection;

        function getRandomMove (max:number){
            return Math.floor(Math.random() * (max));
        }

        if (gamestate.rounds.length > 0) {
            let me = gamestate.rounds[gamestate.rounds.length - 1].p1;
            let opp = gamestate.rounds[gamestate.rounds.length - 1].p2;

            if (me == opp){
                this.carry ++;
            }else if ((me == 'R' && opp == 'S') || (me == 'P' &&  opp == 'R') || (me == 'S' && opp == 'P') || (me == 'D' && opp != 'W') || (me == 'W' && opp == 'D')) {
                // all instances of me winning
                this.scores[0] += this.carry;
                this.carry = 1;
            } else {
                this.scores[1] += this.carry;
                this.carry = 1;
            }
        }


        while (this.dynamiteCount < 100){
            // if behind
            let moveNumber = getRandomMove(4);
            if (moveNumber == 3){
                this.dynamiteCount ++;
            }
            return moves[moveNumber];
        }

        // after dynamite runs out, only randomise first 4 moves
        let moveNumber = getRandomMove(3);
        console.log(this.scores);
        return moves[moveNumber];
    }
}

export = new Bot();
