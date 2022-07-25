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
    

    addParticipant( participant: MatchupParticipant | string) : void
    {
        if( typeof(participant) == 'string')
        {
            let newParticipant = new MatchupParticipant(participant as string, this );
            this.participants.push(newParticipant);
        }
        else 
        {
            participant.matchup = this;
            this.participants.push(participant as MatchupParticipant);
        }
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
        let deckCopy = this.deck.cards;

        for(i =0; i < hands; i++)
        {
            this.deck.cards = deckCopy;
            const table = new TexasHoldem(); 

            if(this.board.length > 0)
            {
                table.setBoard(this.board);
            }


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

    getParticipant(name: string) : MatchupParticipant | null
    {
        let i=0;
        for(i=0; i < this.participants.length; i++)
        {
            if(this.participants[i].name == name)
            {
                return this.participants[i];
            }
        }

        return null;
    }

    printResults() 
    {
        let out =""; 

        if(this.board.length > 0)
        {
            out+= ` Board: [${this.board}]\n`;
        }
        
        this.participants.forEach((p) => {
            if(p.fixedHoleCards)
            {
                out+= `${p.name}\t\t\t\t\t${p.wins} (${p.getWinPercentage()} %)\t\t${p.holeCards} \n`;
            }
            else 
            {
                out+= `${p.name}\t\t\t\t\t${p.wins} (${p.getWinPercentage()} %)\t\t[${p.range.shorthand}] \n`;
            }
        }); 


        console.log(out);

    }


}
