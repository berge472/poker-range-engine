/**
 * 
 * RangeSet
 * 
 * A collection of ranges
 * 
 */

const chalk = require('chalk');
import { Range } from "./Range";

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

const allhands = [
    "AA" ,"AKs","AQs","AJs","ATs","A9s","A8s","A7s","A6s","A5s","A4s","A3s","A2s",
    "AK" ,"KK" ,"KQs","KJs","KTs","K9s","K8s","K7s","K6s","K5s","K4s","K3s","K2s",
    "AQ" ,"KQ" ,"QQ" ,"QJs","QTs","Q9s","Q8s","Q7s","Q6s","Q5s","Q4s","Q3s","Q2s",
    "AJ" ,"KJ" ,"QJ" ,"JJ" ,"JTs","J9s","J8s","J7s","J6s","J5s","J4s","J3s","J2s",
    "AT" ,"KT" ,"QT" ,"JT" ,"TT" ,"T9s","T8s","T7s","T6s","T5s","T4s","T3s","T2s",
    "A9" ,"K9" ,"Q9" ,"J9" ,"T9" ,"99" ,"98s","97s","96s","95s","94s","93s","92s",
    "A8" ,"K8" ,"Q8" ,"J8" ,"T8" ,"98" ,"88" ,"87s","86s","85s","84s","83s","82s",
    "A7" ,"K7" ,"Q7" ,"J7" ,"T7" ,"97" ,"87" ,"77" ,"76s","75s","74s","73s","72s",
    "A6" ,"K6" ,"Q6" ,"J6" ,"T6" ,"96" ,"86" ,"76" ,"66" ,"65s","64s","63s","62s",
    "A5" ,"K5" ,"Q5" ,"J5" ,"T5" ,"95" ,"85" ,"75" ,"65" ,"55" ,"54s","53s","52s",
    "A4" ,"K4" ,"Q4" ,"J4" ,"T4" ,"94" ,"84" ,"74" ,"64" ,"54" ,"44" ,"43s","42s",
    "A3" ,"K3" ,"Q3" ,"J3" ,"T3" ,"93" ,"83" ,"73" ,"63" ,"53" ,"43" ,"33" ,"32s",
    "A2" ,"K2" ,"Q2" ,"J2" ,"T2" ,"92" ,"82" ,"72" ,"62" ,"52" ,"42" ,"32" ,"22" 
]

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

        allhands.forEach((h: string) => {

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