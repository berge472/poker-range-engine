/**
 * 
 * MatchupParticipant
 * 
 * A participant in a hand Matchup
 * 
 */

import { Deck } from "./Deck";
import { Range } from "./Range";
import { RangeSet } from "./RangeSet";

 export class MatchupParticipant{

    holeCards : string[] = [];
    fixedHoleCards =false;
    range: Range = new Range(); 
    wins : number = 0;
    name : string;

    constructor( name: string)
    {
        this.name = name;
    }

    setHoleCards( cards: string[])
    {
        this.holeCards = cards; 
        this.fixedHoleCards = true;
    }

    setRange(range: string | Range ) : void 
    {
        if(typeof range === 'string')
        {
            this.range = new Range();
            this.range.fromShortHand(range);
        }
        else
        {
            this.range = range ;   
        }  
    }

    getHand(deck: Deck) : boolean
    {
        let short = this.range.getRandomDistributedShortHand(); 

        this.holeCards = deck.drawFromShortHand(short as string);

        if(this.holeCards.length == 0)
        {
            return false;
        }

        return true;
    }

}
