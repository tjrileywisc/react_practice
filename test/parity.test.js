
const {generateMsg, getBlock, getBlockParity, generateData} = require('../src/parity.js');

test("test generate data size", () => {

    let table = generateData(2);

    expect(table.length).toEqual(4);
});

test("test get block size", () => {

    let table = generateData(4);

    let block = getBlock(table, 1);

    expect(block.length).toEqual(8);
});

test("test parity check", () => {

    let block = [
        0, 1, 0, 1,
        0, 1, 0, 1,
    ];

    let parity = getBlockParity(block);
    expect(parity).toEqual(0);

    block = [
        0, 1, 1, 1,
        0, 1, 0, 1,
    ];

    parity = getBlockParity(block);
    expect(parity).toEqual(1);
});

test("test msg generation overall parity", () => {

    let msg = generateMsg(4);

    let parity = getBlockParity(msg);
    expect(parity).toEqual(msg[0]);
});