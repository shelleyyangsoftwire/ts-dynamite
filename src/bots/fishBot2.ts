import { Gamestate, BotSelection } from '../models/gamestate';

// this bot is random but does not use any water bombs

class Bot {
    // dynamite count
    public dynamiteCount :number;
    public constructor() {
        this.dynamiteCount = 0;
    }


    // takes the gamestate, outputs each bot selection
    //this.string asBotselection
    makeMove(gamestate: Gamestate): BotSelection {
        let moves: BotSelection[] = ['R', 'P', 'S', 'D'];
        let thisMove: BotSelection;

        function getRandomMove (max:number){
            return Math.floor(Math.random() * (max));
        }

        while (this.dynamiteCount < 100){
            let moveNumber = getRandomMove(4);
            if (moveNumber == 3){
                this.dynamiteCount ++;
            }
            return moves[moveNumber];
        }

        // after dynamite runs out, only randomise first 4 moves
        let moveNumber = getRandomMove(3);
        return moves[moveNumber];
    }
}

export = new Bot();
