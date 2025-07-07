import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    dynamiteRemaining = 100;
    opponentDrawResponses = [];
    checkDrawResponse( move :BotSelection) : boolean {
        if (this.opponentDrawResponses.length > 3){
            var setOfResponses = new Set(this.opponentDrawResponses.slice(-3));
        } else {
            return false;
        }
        if(setOfResponses.size==1 && this.opponentDrawResponses.length>1){
            if(setOfResponses[0] == move){
                return true;
            }
        }
        return false;
    }

    checkLastDraw(gamestate: Gamestate){ // Check if last game was draw
        if(gamestate.rounds.length===0) return true;
        const lastMove = gamestate.rounds.length-1;
        return (gamestate.rounds[lastMove].p1 === gamestate.rounds[lastMove].p2);
    }

    checkDynamiteStreak(n:number, gamestate: Gamestate){
        if(gamestate.rounds.length < n) return false;
        let last = gamestate.rounds[gamestate.rounds.length-1].p2;
        for(let i = gamestate.rounds.length-1; i > gamestate.rounds.length-n-1; i--){
            if(gamestate.rounds[i].p2 !== last || last !== "D"){
                return false;
            }
        }
        return true;
    }

    makeMove(gamestate: Gamestate): BotSelection {
        const round = gamestate.rounds.length;
        if(round == 0) return "W";
        const baseMoves: BotSelection[] = ['R', 'P' ,'S'];
        // Get random move from basemoves
        let selection = baseMoves[Math.floor(Math.random() * baseMoves.length)];

        // Keeping track of opponents draw responses
        if(round > 1){
            if(gamestate.rounds[round-2].p1 == gamestate.rounds[round-2].p2){
                this.opponentDrawResponses.push(gamestate.rounds[round-1]);
            }
        }

        if(this.checkLastDraw(gamestate)){
            if (this.dynamiteRemaining>0 && gamestate.rounds[round-1].p1 != "W") {
                selection = "D";
            }
            if (this.checkDrawResponse('W')){
                selection = baseMoves[Math.floor(Math.random() * baseMoves.length)];
            }
        }
        if(this.checkDynamiteStreak(Math.floor(Math.random() * 3)+1, gamestate) || this.checkDrawResponse('D')){
            selection = "W";
        }
        if(selection == "D"){
            this.dynamiteRemaining--;
        }

        return selection;
    }
}

export = new Bot();