var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var RezToken = artifacts.require('RezToken.sol');
var RezSafe = artifacts.require('RezSafe.sol');

module.exports = (deployer, network, accounts) => {
  deployer.deploy(SimpleStorage);

  let timeTilStart = 0
  let timeDuration = 100

  let currentBlock = web3.eth.blockNumber
  let startBlock = Math.round(currentBlock + timeTilStart / 1.0) 
  let endBlock   = Math.round(startBlock + timeDuration / 1.0) 

  deployer.deploy(RezToken, accounts[0], accounts[0], startBlock, endBlock)
    .then(()    => RezToken.deployed())
    .then(rez => deployer.deploy(RezSafe, rez.address));
};
