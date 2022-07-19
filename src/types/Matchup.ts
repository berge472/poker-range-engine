/**
 * 
 * Matchup 
 * 
 * A collection of participants with starting hands or ranges for calculating equity with optional community cards
 * 
 */

import { Deck } from "./Deck";
import { MatchupParticipant } from "./MatchupParticipant";
import { TexasHoldem } from "poker-odds-calc";
import Table from "poker-odds-calc/dts/lib/Table";

export class Matchup{

    participants: MatchupParticipant[] = []; 
    board : string[] = [];
    deck: Deck = new Deck();
    totalHands = 0;


    addParticipant( participant: MatchupParticipant) : void
    {
        this.participants.push(participant);
    }

    setBoard( cards: string[])
    {
        if(this.deck.drawSelect(cards))
        {
            this.board = cards;
        }
    }


    runMatchup(hands?: number, boardsPerhand?: number )
    {
        if(typeof hands === 'undefined')
        {
            hands = 1000
        }
        if(typeof boardsPerhand === 'undefined')
        {
            hands = 1000
        }

        //sort participants so known hole cards are first
        //This makes it easier to draw range combos from the deck without collision 
        this.participants.sort((a,b) => {

            if(a.fixedHoleCards && b.fixedHoleCards)
            {
                return 0;
            }
            else if(a.fixedHoleCards && (!b.fixedHoleCards))
            {
                return -1;
            }

            return 1;
        });

        this.participants.forEach((e) =>{
            if(e.fixedHoleCards)
            {
                this.deck.drawSelect(e.holeCards);
            }
        });

        let i =0;
        let failCount = 0;

        const deckHold = this.deck; //save off current state so we can reuse

        for(i =0; i < hands; i++)
        {
            this.deck.reset();
            const deckHold = this.deck; //save off current state so we can reuse
            const table = new TexasHoldem(); 

            //table.setBoard(this.board);


            this.participants.forEach((e) =>{
                
                if(e.fixedHoleCards)
                {
                this.deck.drawSelect(e.holeCards);
                }
                else
                {
                    while(!e.getHand(this.deck))
                    {
                        failCount++;

                        if(failCount == 100)
                        {
                            break;
                        }
                    }
                    
                }

                table.addPlayer(e.holeCards as [string,string]);

            });

            table.limit(boardsPerhand as number);

            const result = table.calculate(); 

            const players = result.getPlayers();

            let a =0;
            for(a=0; a< players.length; a++)
            {
                this.participants[a].wins += players[a].getWins();
            }

            this.totalHands += result.getIterations();
        }
    }

    printResults() 
    {
        let out =""; 

        this.participants.forEach((p) => {
            out+= `${p.name}\t\t\t${p.wins} (${p.wins * 100 / this.totalHands} %)\n`;
        }); 

        console.log(out);

    }


}
