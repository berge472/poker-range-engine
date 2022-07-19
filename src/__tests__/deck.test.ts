import { Deck } from "../index";



test('Deck drawShort', () => { 

    let deck = new Deck();
    let hands : string[][] = []

    hands.push(deck.drawFromShortHand('JTs'));
    hands.push(deck.drawFromShortHand('88'));
    hands.push(deck.drawFromShortHand('QK'));

    console.log(hands);

});