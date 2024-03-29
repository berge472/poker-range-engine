
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
    "AKo","KK" ,"KQs","KJs","KTs","K9s","K8s","K7s","K6s","K5s","K4s","K3s","K2s",
    "AQo","KQo","QQ" ,"QJs","QTs","Q9s","Q8s","Q7s","Q6s","Q5s","Q4s","Q3s","Q2s",
    "AJo","KJo","QJo","JJ" ,"JTs","J9s","J8s","J7s","J6s","J5s","J4s","J3s","J2s",
    "ATo","KTo","QTo","JTo","TT" ,"T9s","T8s","T7s","T6s","T5s","T4s","T3s","T2s",
    "A9o","K9o","Q9o","J9o","T9o","99" ,"98s","97s","96s","95s","94s","93s","92s",
    "A8o","K8o","Q8o","J8o","T8o","98o","88" ,"87s","86s","85s","84s","83s","82s",
    "A7o","K7o","Q7o","J7o","T7o","97o","87o","77" ,"76s","75s","74s","73s","72s",
    "A6o","K6o","Q6o","J6o","T6o","96o","86o","76o","66" ,"65s","64s","63s","62s",
    "A5o","K5o","Q5o","J5o","T5o","95o","85o","75o","65o","55" ,"54s","53s","52s",
    "A4o","K4o","Q4o","J4o","T4o","94o","84o","74o","64o","54o","44" ,"43s","42s",
    "A3o","K3o","Q3o","J3o","T3o","93o","83o","73o","63o","53o","43o","33" ,"32s",
    "A2o","K2o","Q2o","J2o","T2o","92o","82o","72o","62o","52o","42o","32o","22" 
];

export class Range{

    shorthand: string ="";
    arrExpandedShortHand: string[] = [];
    distributedShortHands: string[] = [];
    action: string = ""; 
    actionWeights : Map<string, number>;

    hexcolor: string = "#DCDCDC";

    constructor( range?: string | any)
    {
        this.actionWeights = new Map<string,number>();
        if(typeof range !== 'undefined')
        {
            if(typeof range === 'string')
            {
                this.fromShortHand(range);
            }
            else 
            {
                if(typeof(range.action) == 'string')
                {
                    let arrActions = range.action.split('/');
                    arrActions.forEach((e : string) => {
                        this.actionWeights.set(e, (1/ arrActions.length));
                        this.action += e +"/";
                    });
                }
                else 
                {
                    const len = Object.keys(range.action).length;
                    for (const prop in range.action) {
                        this.actionWeights.set(range.action[prop], (1/ len));
                        this.action += prop +"/";
                      }
                }

                this.action = this.action.substring(0,this.action.length -1);

                console.log(this.action);


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
    
    

            this.arrExpandedShortHand = prange(this.shorthand);
    
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

    /**
     * @brief   gets an array of hand types based with proper distibution 
     *          ie 'JJ, JTs' would expand to:   
     *          [JJ, JJ, JJ, JJ, JJ, JJ, JTs, JTs, JTs, JTs]
     * @returns 
     */
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