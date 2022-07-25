poker-range-engine
==================

This is an npm package for evaluating range and hand matchups in poker. It allows a user to define a preflop strategy using a yaml file with different ranges based on situation/position.

It also allows the user to run hand equity calculations using actual cards, or a range. 


Strategy Format
---------------

Strategies are stored in yaml files. They are a collection of `RangeSet` objects. Each `RangeSet` is a collection of `Range` objects each with their own actions(s). Rangesets have `node` parameter which can be used to set a path for organizing into a tree structure.  


This example shows the RFI (Raise First In) ranges for UTG and UTG+1. In this case each `RangeSet` has 2 ranges, 1 range is a pure 'raise' range while the other is hands that can be played as either a raise or fold. The UTG+1 example shows how range actions can also be weighted. In this case hands in that range should be raised 75% of the time and folded 25%.

.. code::  yaml 

    name: TestStrategy
    desc: test description based on upswing online cash

    rangesets:
    - node: rfi/utg
        ranges: 
        - action: raise 
          range: 88+, AQo+, ATs+, KTs+, QTs+
        - action: raise/fold
          range: A2s-A9s, 67s-9Ts,66,77 
    - node: rfi/utg+1
        ranges: 
        - action: raise 
          range: 77+, AQo+, A8s+, A4s-A5s, KTs+, QTs+, JTs
        - action: {raise : .75 , fold : .25}
          range: A2s,A3s,A6s,A7s,AJo,KQo, 65s-T9s, 66, K8s,K9s,Q9s,J9s
          
          

Equity Matchups 
---------------

Matchups can be run to calculate hand equities of various holdings. Matchups can be calculated using set hole cards, or ranges. 



.. code:: javascript 

    let match = new Matchup();

    match.addParticipant('utg');
    match.addParticipant('btn');
    match.addParticipant('hero');
    
    //                                                                 
    match.getParticipant('utg')?.setRange('88+, JTs+');                   
    match.getParticipant('btn')?.setHoleCards(['Js','Ad']);         
    match.getParticipant('hero')?.setRange(new Range('all'));      

    //Run 1000 hands with 1000 runouts each
    match.runMatchup(1000,1000);
    match.printResults();


|btn                                       284033 (28.4 %)         Js,Ad
|utg                                       529681 (52.97 %)        [88+, JTs]
|hero                                      169774 (16.98 %)        [22+, A2+, K2+, Q2+, J2+, T9-32, T8-42, T7-T2, 96-92, 85-82, 74, 73, 63, 72, 62, 52]
  

Matchups can also be run with known board cards 

.. code:: javascript 

  match.setBoard(['4s','Jc', 'Tc']);


.. note:: Currently the weighted actions of ranges are not factored in when running Matchups of `RangeSets`
