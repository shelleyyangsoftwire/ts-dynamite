import { Gamestate, BotSelection } from '../models/gamestate';

// this bot is entirely random, with a limit on the number of dynamites

class Bot {
    // dynamite count
    public dynamiteCount :number;
    public constructor() {
        this.dynamiteCount = 0;
    }


    // takes the gamestate, outputs each bot selection
    //this.string asBotselection
    makeMove(gamestate: Gamestate): BotSelection {
        let moves: BotSelection[] = ['R', 'P', 'S', 'W', 'D'];
        let thisMove: BotSelection;

        function getRandomMove (max:number){
            return Math.floor(Math.random() * (max));
        }

        while (this.dynamiteCount < 100){
            let moveNumber = getRandomMove(5);
            thisMove = moves[moveNumber];
            if (moveNumber == 4){
                this.dynamiteCount ++;
            }
            return thisMove;
        }

        // after dynamite runs out, only randomise first 4 moves
        let moveNumber = getRandomMove(4);
        thisMove = moves[moveNumber];

        return thisMove;
    }
}

export = new Bot();
