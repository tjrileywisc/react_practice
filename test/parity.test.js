
const {generateMsg, getBlock, getBlockParity, generateData} = require('../src/parity.js');

test("test1", () => {

    let table = generateData(2);

    expect(table.length).toEqual(4);
});

test("test2", () => {

    let table = generateData(2);

    let block = getBlock(table, 0);

    expect(block.length).toEqual(4);
});