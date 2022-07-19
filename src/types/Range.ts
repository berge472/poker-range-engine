
/**
 * 
 * Range 
 * 
 * A collection of starting hands
 * 
 */


const prange = require('prange');

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


    toShortHand () : string 
    {

        return "";
    }

    fromShortHand(short: string)
    {
        this.shorthand = short.toUpperCase().replace(/S/g, 's').replace(/O/g, 'o'); //Normalize shorthand capitalization for prange


        //console.log(this.shorthand)
        this.arrExpandedShortHand = prange(this.shorthand);

        let tmp : string[] = []

        this.arrExpandedShortHand.forEach( (e : string) => {
            
            tmp.push(e.replace('o',''));
        });

        this.arrExpandedShortHand = tmp;

        let i =0;
        // this.arrExpandedShortHand.forEach( (e : string) => {
            
        //     this.startinghands.push(new StartingHand(e));
        // });

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