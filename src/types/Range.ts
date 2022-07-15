
/**
 * 
 * Range 
 * 
 * A collection of starting hands
 * 
 */

import { Combo } from "./Combo";
import { StartingHand } from "./StartingHand";

const prange = require('prange');

export class Range{

    startinghands: StartingHand[] = [];

    shorthand: string ="";
    arrExpandedShortHand: string[] = [];
    action: string ="";

    hexcolor: string = "#DCDCDC";

    constructor( obj?: any)
    {
        if(typeof obj !== 'undefined')
        {
            this.action = obj.action;
            this.fromShortHand(obj.range);
        }
    }


    toShortHand () : string 
    {

        return "";
    }

    fromShortHand(short: string)
    {
        this.shorthand = short;
        this.arrExpandedShortHand = prange(short);

        let i =0;
        this.arrExpandedShortHand.forEach( (e : string) => {
            
            this.startinghands.push(new StartingHand(e));
        });

    }

    contains( short: string) : boolean
    {
        if(this.arrExpandedShortHand.includes(short))
        {
            return true;
        }

        return false;
    }

    getCombos() : Combo[]
    {
        return [];
    }

    print() : void
    {

    }

}