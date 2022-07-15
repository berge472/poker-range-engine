/**
 * StartingHand 
 * 
 * This represents a generic starting hand on the hand matrix such as JTs
 * 
 */

import { Card } from "./Card";
import { Combo } from "./Combo";

export class StartingHand {

    shorthand: string = ""; //Shorthand representation such as AJs or AQo
    combos: Combo[] = [];   //Array of actual combos represented

    constructor (shorthand : string) {

        
    }


    /**
     * Removes Combos that include certain cards
     * @param cards 
     */
    applyRemoval( cards: Card[] )
    {

    }

}