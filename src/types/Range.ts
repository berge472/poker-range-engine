
/**
 * 
 * Range 
 * 
 * A collection of starting hands
 * 
 */


const prange = require('prange');

export const ALL_HANDS = [
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
];

export class Range{

    shorthand: string ="";
    arrExpandedShortHand: string[] = [];
    distributedShortHands: string[] = [];
    action: string ="";

    hexcolor: string = "#DCDCDC";

    constructor( range?: string | any)
    {
        if(typeof range !== 'undefined')
        {
            if(typeof range === 'string')
            {
                this.fromShortHand(range);
            }
            else 
            {
                this.action = range.action;
                this.fromShortHand(range.range);
            }
        }

    }


    fromShortHand(short: string)
    {
        if(short.toLowerCase() == 'all')
        {
            this.arrExpandedShortHand = ALL_HANDS;
        }
        else 
        {

            this.shorthand = short.toUpperCase().replace(/S/g, 's').replace(/O/g, 'o'); //Normalize shorthand capitalization for prange
    
    
            //console.log(this.shorthand)
            this.arrExpandedShortHand = prange(this.shorthand);
    
            let tmp : string[] = []
    
            this.arrExpandedShortHand.forEach( (e : string) => {
                
                tmp.push(e.replace('o',''));
            });
    
            this.arrExpandedShortHand = tmp;
        }


  

        this.shorthand = prange.reverse(this.arrExpandedShortHand);

    }

    contains( short: string) : boolean
    {
        if(this.arrExpandedShortHand.includes(short))
        {
            return true;
        }

        return false;
    }

    getDistributedShortHands() : string[] 
    {
        let shorts : string[] =[];

        this.arrExpandedShortHand.forEach((e) => {
            let comboCount =  12; 

            //pocket pair
            if(e.charAt(0) == e.charAt(1))
            {
                comboCount = 6;
            }
            else if(e.includes("s"))
            {
                comboCount = 4;
            }

            let i = 0;
            for(i=0; i < comboCount; i++)
            {
                shorts.push(e);
            }
        });

        this.distributedShortHands = shorts;
        return shorts;
    }

    getRandomDistributedShortHand() : string
    {
        if(this.distributedShortHands.length == 0)
        {
            this.getDistributedShortHands();
        }
        let idx = Math.floor(Math.random() * this.distributedShortHands.length);
        return this.distributedShortHands[idx];
    }


    print() : void
    {

    }

}