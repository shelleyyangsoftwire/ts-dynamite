import { Gamestate, BotSelection } from '../models/gamestate';

// improvement upon fishBot 3 -- reduce waterbomb usage to 50%

class Bot {
    // dynamite count
    private dynamiteCount :number;
    private oppDynamiteCount : number;
    private moves: BotSelection[];
    public constructor() {
        this.dynamiteCount = 0;
        this.oppDynamiteCount = 0;
        this.moves  = ['D', 'R', 'P', 'S', 'W'];
    }

    makeMove(gamestate: Gamestate): BotSelection {
        let thisMove: BotSelection;

        function getRandomMove (max:number){
            return Math.floor(Math.random() * (max));
        }

        // remove dynamite from available moves
        if (this.dynamiteCount == 100){
            this.moves.shift();
            this.dynamiteCount++;
        }

        // remove water from available moves
        if (gamestate.rounds.length > 0 && gamestate.rounds[gamestate.rounds.length - 1].p2 === 'D'){
            this.oppDynamiteCount ++;
        }
        if (this.oppDynamiteCount == 100){
            this.moves.pop();
            this.oppDynamiteCount++;
        }

        // get available moves
        let moveNumber  = getRandomMove(this.moves.length);
        thisMove = this.moves[moveNumber];
        if (thisMove == 'D'){
            this.dynamiteCount ++;
        }

        // sometimes drop W
        if (thisMove == 'W'){
            // 50% chance of dropping the W and picking something else
            let random = Math.floor(Math.random() * (2));
            console.log(random);
            if (random == 0){
                console.log('w dropped');
                // function to drop W
                moveNumber  = getRandomMove(this.moves.length - 1);
                thisMove = this.moves[moveNumber];
            }
        }

        return thisMove;
    }
}

export = new Bot();
