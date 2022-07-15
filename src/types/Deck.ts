import { Card } from "./Card";
import { Combo } from "./Combo";

export class Deck{

    cards : Card[] = [];


    constructor()
    {

    }

    shuffle()
    {

    }

    remove(cards : Card[])
    {

    }

    draw() : Card | undefined
    {
        return this.cards.pop();
    }

}