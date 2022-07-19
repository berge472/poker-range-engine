import { Range, Matchup, MatchupParticipant } from "../index";




test('matchup', () => {

    let match = new Matchup();

    match.addParticipant(new MatchupParticipant('utg'));
    match.addParticipant(new MatchupParticipant('btn'));
    match.addParticipant(new MatchupParticipant('hero'));
    
    match.participants[0].setRange('88+, JTs+');
    match.participants[1].setHoleCards(['Js','Ad']);
    match.participants[2].setRange(new Range('66+, A2s+, K9+'));

    match.runMatchup(100,1000);

    match.printResults();


});