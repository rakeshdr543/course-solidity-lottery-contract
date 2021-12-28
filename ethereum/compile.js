const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
const contractFileName = "Lottery.sol";

// Deleting existing build folder
fs.removeSync(buildPath);

const lotteryPath = path.resolve(__dirname, "contracts", contractFileName);
const source = fs.readFileSync(lotteryPath, "utf-8");

const input = {
  language: "Solidity",
  sources: {},
  settings: {
    metadata: {
      useLiteralContent: true,
    },
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

input.sources[contractFileName] = {
  content: source,
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contracts = output.contracts[contractFileName];

// Create build folder
fs.ensureDirSync(buildPath);

// Extract and write json representation of contract
for (let contract in contracts) {
  if (contracts.hasOwnProperty(contract)) {
    fs.outputJSONSync(
      path.resolve(buildPath, `${contract}.json`),
      contracts[contract]
    );
  }
}
