/**
 * 
 * RangeSet
 * 
 * A collection of ranges
 * 
 */

const chalk = require('chalk');
import { ALL_HANDS, Range } from "./Range";

const actionColors = {
    'raise' : '#8c0c0a',
    'raise/fold' : '#8c5c5b',
    'raise/call' : '#B2321B',
    'call/fold' : '#47C8A9'
}


const actionColorMap = new Map([
    ['raise' , '#ff0505'],
    ['raise/fold' , '#692020'],
    ['call', "#330680"],
    ['raise/call' , '#B2321B'],
    ['call/fold' , '#47C8A9']
]);


export class RangeSet{
    
    name: string = "";
    path: string = "";
    ranges : Range[] = [];


    constructor(obj?: any )
    {
        if(typeof obj !== 'undefined')
        {
            this.path = obj.node;
            const nodesplit = this.path.split('/');
            this.name = nodesplit[nodesplit.length -1];

            let i=0; 
            for(i =0; i < obj.ranges.length; i++)
            {
                this.ranges.push(new Range(obj.ranges[i]));
            }
        }
    }

    toRange() : Range 
    {
        let short = "";

        this.ranges.forEach( (r) => {
            short += "," + r.shorthand;
        });

        return new Range(short.substring(1));
    }

    print() : string 
    {
        let out ="";
        let i =0;
        out += this.path + "\n\n";

        for(i=0; i < this.ranges.length; i++)
        {
            out+= `${this.ranges[i].arrExpandedShortHand} : ${this.ranges[i].action}\n` ;
        }

        out+="\n";

        let self = this;

        let count = 0;

        ALL_HANDS.forEach((h: string) => {

            let included = false;
            let text = " ";
            let color = "#b5b5b5";
            let bgcolor = "#000000";


            let i=0; 
            for(i = 0; i < this.ranges.length; i ++)
            {
                let r = this.ranges[i];
                if(r.contains(h))
                {
                    included = true;
                    color = actionColorMap.get(r.action) as string;
                    bgcolor = actionColorMap.get(r.action) as string;
                    text+= h + " ";
                    break;
                }
            }
           

            if(!included)
            {
                //text+= '--';
                text+= h + " ";
            }

            if(h.length == 2)
            {
                text+= " ";
            }

            out+= chalk.hex(color)(text);

            
            if(count == 12)
            {
                out+="\n";
                count =0;
            }
            else
            {
                count++;
            }
            
        });

        return out; 
    }

    
}