/**
 * If sum of block is even overall, parity is 0
 * @param {*} array
 */
function getBlockParity(data) {
  return data.slice(1).reduce((a, b) => a + b) % 2 === 0 ? 0 : 1;
}

/**
 *
 * @param {*} data original array of data
 * @param {*} power power of 2 to use for block parity
 */
function getBlock(data, power) {
  // generates strings with binary values, padded with zeros
  const matchingIndexes = getBlockIndexes(data, power);
  const matchingData = matchingIndexes.map((index) => data[index]);

  return matchingData;
}

function getBlockIndexes(data, power) {
  const size = data.length;
  const binaryData = data.map((value, index) => {
    return index.toString(2).padStart(Math.sqrt(size), "0");
  });

  let matching = [];
  // for each string, reverse, check if there's a 1 in the correct place
  for (let value of binaryData) {
    if (value.split("").reverse().join("").charAt(power) === "1") {
      // want the actual data back at the end
      let index = parseInt(value, 2);
      matching.push(index);
    }
  }
  return matching;
}

function generateData(size) {
  // just fill with random binary data first
  const data = Array.from({ length: size ** 2 }, () =>
    Math.round(Math.random())
  );

  return data;
}

/**
 * Given a size parameter for the message,
 * generate the correct parity bits,
 * and fill the flattened array with the rest of
 * a message
 * @param {Integer} size
 *
 * @returns {Array} a flattened array with the correct ones and zeros
 */
function generateMsg(size) {
  let data = generateData(size);

  // determine parity bits; for size = 16: 0001, 0010, 1000, 1100
  // (with 0000 set to full table parity)
  // i.e. 2^n for 0..size of table

  for (let power = 1; power < Math.sqrt(size); power++) {
    let block = getBlock(data, power);
    let parity = getBlockParity(block);
    data[power] = parity;
  }

  let tableParity = getBlockParity(data);
  data[0] = tableParity;

  return data;
}

module.exports = {
  getBlock: getBlock,
  getBlockIndexes: getBlockIndexes,
  getBlockParity: getBlockParity,
  generateMsg: generateMsg,
  generateData: generateData,
};
