import { Range, Matchup, MatchupParticipant, PreflopStrategy, RangeSet } from "../index";

const fs = require('fs');
const YAML = require('yaml');



test('matchup', () => {

    let match = new Matchup();

    match.addParticipant(new MatchupParticipant('utg'));
    match.addParticipant(new MatchupParticipant('btn'));
    match.addParticipant(new MatchupParticipant('hero'));
    
    match.participants[0].setRange('88+, JTs+');
    match.participants[1].setHoleCards(['Js','Ad']);
    match.participants[2].setRange(new Range('all'));

    match.runMatchup(1000,100);

    match.printResults();


});

test('rangeset-matchup', () =>{
    const ymltxt = fs.readFileSync('./data/strategy.yml').toString();

    const obj = YAML.parse(ymltxt);
  
    const strat = new PreflopStrategy(obj);
  
    const utg = strat.getNode('rfi/utg');
    const lojack = strat.getNode('rfi/lojack');

    let match = new Matchup();

    match.addParticipant(new MatchupParticipant('utg'));
    match.addParticipant(new MatchupParticipant('lojack'));

    match.participants[0].setRange(utg?.toRange() as Range);
    match.participants[1].setRange(lojack?.toRange() as Range);

    console.log(utg?.print());
    console.log(lojack?.print());
    match.runMatchup(1000,100);

    match.printResults();
});