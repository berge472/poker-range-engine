import { Card } from "./Card";
import { Combo } from "./Combo";

const freshDeck = ["Ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "Tc", "Jc", "Qc", "Kc",
"Ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "Th", "Jh", "Qh", "Kh",
"As", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "Ts", "Js", "Qs", "Ks",
"Ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "Td", "Jd", "Qd", "Kd"];

const suitshuffles = [  'shcd','hscd', 'cshd', 'schd', 'hcsd', 'chsd', 
                        'chds', 'hcds', 'dchs', 'cdhs', 'hdcs', 'dhcs', 
                        'dsch', 'sdch', 'cdsh', 'dcsh', 'scdh', 'csdh', 
                        'hsdc', 'shdc', 'dhsc', 'hdsc', 'sdhc', 'dshc']

export class Deck{

    cards : string[] = freshDeck;


    constructor()
    {

    }

    remove(cards : Card[])
    {

    }

    drawSelect( select: string[])
    {
        let success = true; 

        select.forEach((e) => {
            if(!this.cards.includes(e))
            {
                success = false;
            }
        });

        if(success)
        {
            let filteredCards = this.cards.filter((c : string) => (!select.includes(c)) );
            this.cards = filteredCards;
        }

        return success;
    }

    drawRandom(len?: number, remove?: boolean) : string[]
    {
        let arrRet :string[]= [];

        if(typeof len === 'undefined')
        {
            len = 1;
        }

        let i=0; 
        for(i =0; i < len; i ++)
        {
            let idx = Math.floor(Math.random() * this.cards.length);
            arrRet.push(this.cards[idx]);
        }

        if(remove)
        {
            
            let filteredCards = this.cards.filter((c : string) => (!arrRet.includes(c)) );
            this.cards = filteredCards;
        }

        return arrRet;
    }

    /**
     * @brief draws a hand based on shorthand i.e. JTs
     */
    drawFromShortHand(short: string) : string[]
    {
        let ret : string[] = [];

        let suitsIdx = Math.floor(Math.random() * 24);
        let suits = suitshuffles[suitsIdx];
        let i=0;
        
        let cardA : string = short[0];
        let cardB : string = short[1];

        if(short.length == 3 && short[2] == 's')
        {
            //Suited Cards 
            for(i= 0; i < 4; i++)
            {
                if(this.drawSelect([ cardA+suits[i], cardB + suits[i]]))
                {
                    ret.push(cardA + suits[i]);
                    ret.push(cardB + suits[i]);
                    break;
                }
            }

        }
        else 
        {
            //Pocket Pair 

            for(i=0; i < 24; i++)
            {
                if(this.drawSelect([ cardA+suitshuffles[suitsIdx][0], cardB + suitshuffles[suitsIdx][1]]))
                {
                    ret.push( cardA + suitshuffles[suitsIdx][0]);
                    ret.push(cardB + suitshuffles[suitsIdx][1]);
                    break;
                }

                suitsIdx++;
                if(suitsIdx == 24)
                {
                    suitsIdx =0;
                }
            }
        }
       


        return ret;
    }

    reset() : void 
    {
        this.cards = freshDeck;
    }

}