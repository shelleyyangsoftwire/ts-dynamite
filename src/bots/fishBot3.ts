import { Gamestate, BotSelection } from '../models/gamestate';

// this bot includes water bombs, but stops using them after the opponent runs out

class Bot {
    // dynamite count
    private dynamiteCount :number;
    private oppDynamiteCount : number;
    private moves: BotSelection[];
    public constructor() {
        this.dynamiteCount = 0;
        this.oppDynamiteCount = 0;
        this.moves  = ['W', 'R', 'P', 'S', 'D'];
    }

    makeMove(gamestate: Gamestate): BotSelection {
        let thisMove: BotSelection;

        function getRandomMove (max:number){
            return Math.floor(Math.random() * (max));
        }

        // remove dynamite from available moves
        if (this.dynamiteCount == 100){
            this.moves.pop();
            this.dynamiteCount = 0;
        }

        // remove water from available moves
        if (gamestate.rounds.length > 0 && gamestate.rounds[gamestate.rounds.length - 1].p2 === 'D'){
            this.oppDynamiteCount ++;
        }
        if (this.oppDynamiteCount == 100){
            this.moves.shift();
            this.oppDynamiteCount = 0;
        }

        // get available moves

        let moveNumber  = getRandomMove(this.moves.length);
        console.log(moveNumber);
        thisMove = this.moves[moveNumber];
        if (thisMove == 'D'){
            this.dynamiteCount ++;
        }

        return thisMove;
    }
}

export = new Bot();
