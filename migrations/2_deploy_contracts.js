web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

// var TestRPC = require("ethereumjs-testrpc");
// web3.setProvider(TestRPC.provider());

var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var RezToken = artifacts.require('./RezToken.sol');
var RezSafe = artifacts.require('./RezSafe.sol');

module.exports = (deployer, network, accounts) => {
  let timeTilStart = 0
  let timeDuration = 60

  let currentBlock = web3.eth.blockNumber;
  let startBlock = Math.round(currentBlock + timeTilStart / 1.0) 
  let endBlock   = Math.round(startBlock + timeDuration / 1.0) 
  deployer.deploy(SimpleStorage);

  deployer.deploy(RezToken, accounts[0], accounts[0], startBlock, endBlock)
    .then(()    => RezToken.deployed())
    .then(rez => deployer.deploy(RezSafe, rez.address));
};
