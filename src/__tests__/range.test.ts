import { PreflopStrategy } from "../index"

const fs = require('fs');
const YAML = require('yaml');



test('Range Set Test', () => {

  const ymltxt = fs.readFileSync('./data/strategy.yml').toString();

  const obj = YAML.parse(ymltxt);

  const strat = new PreflopStrategy(obj);

  strat.printAll();

  console.log("Testing");

})