/**
 * 
 *  Strategy
 * 
 * A collection of rangesets
 * 
 */

import { RangeSet } from "./RangeSet";

export class PreflopStrategy {

    name: string = "";
    desc: string = "";
    rangesets: RangeSet[] = [];

    constructor(obj?:any)
    {
        if(typeof obj !== 'undefined')
        {
            this.name = obj.name;
            this.desc = obj.desc; 

            let i;
            for(i=0; i < obj.rangesets.length; i++)
            {
                this.rangesets.push(new RangeSet( obj.rangesets[i]));
            }
        }
    }


    printAll() : void 
    {
        this.rangesets.forEach(e => {
            console.log(e.print());
        });
    }
}