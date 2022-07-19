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