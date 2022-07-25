import { PreflopStrategy, Range } from "../index"

const fs = require('fs');
const YAML = require('yaml');


test('range', () => {

  const r1 = new Range('JT, JT');
  const r2 = new Range('JTo, JTo');
  const r3 = new Range('AT+');
  console.log(r1.arrExpandedShortHand);
  console.log(r2.arrExpandedShortHand);
  console.log(r3.arrExpandedShortHand);
})


test('strategy', () => {

  const ymltxt = fs.readFileSync('./data/strategy.yml').toString();

  const obj = YAML.parse(ymltxt);

  const strat = new PreflopStrategy(obj);

  const node = strat.getNode('rfi/utg');
  console.log(node?.print());

})

test('distribution', ()=>{

  const r1 = new Range('JJ, JT, QJo');

  const arrRq = r1.getDistributedShortHands();

  let jjCount = 0; 
  let jtsCount = 0;
  let jtCount = 0;
  let qjoCount = 0;
  let otherCount = 0;


  arrRq.forEach((e) => {

    if(e == 'JJ')
    {
      jjCount++;
    }
    else if(e == 'JTs')
    {
      jtsCount++;
    }
    else if(e == 'JTo')
    {
      jtCount++;  
    }
    else if(e == 'QJo')
    { 
      qjoCount++;
    }
    else 
    {
      otherCount++;
    }
  });


  expect(jjCount).toBe(6);
  expect(jtsCount).toBe(4);
  expect(jtCount).toBe(12);
  expect(qjoCount).toBe(12);
  expect(otherCount).toBe(0);
  
  console.log(arrRq);

})