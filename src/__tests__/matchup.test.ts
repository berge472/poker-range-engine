import { Range, Matchup, MatchupParticipant, PreflopStrategy, RangeSet } from "../index";

const fs = require('fs');
const YAML = require('yaml');



test('matchup', () => {

    let match = new Matchup();

    match.addParticipant('utg');
    match.addParticipant('btn');
    match.addParticipant('hero');
    
    //                                                               Equilab      
    match.getParticipant('utg')?.setRange('88+, JTs+');            // 51.32        
    match.getParticipant('btn')?.setHoleCards(['Js','Ad']);        // 30.61  
    match.getParticipant('hero')?.setRange(new Range('all'));      // 18.07

    //Run 1000 hands with 1000 runouts each
    match.runMatchup(1000,1000);
    match.printResults();
    
    //Make sure we are close to equilab results
    let utgWin = match.getParticipant('utg')?.getWinPercentage() as number;
    let btnWin = match.getParticipant('btn')?.getWinPercentage() as number;
    let heroWin = match.getParticipant('hero')?.getWinPercentage() as number;

    let utgDiff = Math.abs(utgWin - 51.32);
    let btnDiff = Math.abs(btnWin  - 30.61);
    let heroDiff = Math.abs(heroWin  - 18.07);


    //Make sure we are +/- 3 of the equilab results
    // (Results are from 100M hands, so we dont expect to be exact)
    expect(utgDiff).toBeLessThan(3);
    expect(btnDiff).toBeLessThan(3);
    expect(heroDiff).toBeLessThan(3);



});


//Test rangeset and matchup with a board
test('rangeset-matchup', () =>{
    const ymltxt = fs.readFileSync('./data/strategy.yml').toString();

    const obj = YAML.parse(ymltxt);
  
    const strat = new PreflopStrategy(obj);
  
    const utg = strat.getNode('rfi/utg');
    const cutoff = strat.getNode('rfi/cutoff');

    let match = new Matchup();

    match.addParticipant(new MatchupParticipant('utg'));
    match.addParticipant(new MatchupParticipant('cutoff'));

    match.getParticipant('utg')?.setRange(utg?.toRange() as Range);
    match.getParticipant('cutoff')?.setRange(cutoff?.toRange() as Range);

    match.setBoard(['4s','Jc', 'Tc']);

    console.log(utg?.print());
    console.log(cutoff?.print());
    match.runMatchup(100,1000);

    match.printResults();
});