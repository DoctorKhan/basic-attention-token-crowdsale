var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var RezToken = artifacts.require('RezToken.sol');
var RezSafe = artifacts.require('RezSafe.sol');


module.exports = function(deployer, network, accounts) {
  deployer.deploy(SimpleStorage);

  let timeTilStart = 0
  let timeDuration = 60

  let currentBlock = web3.eth.blockNumber
  let startBlock = Math.round(currentBlock + timeTilStart / 14.0) 
  let endBlock   = Math.round(startBlock + timeDuration / 14.0) 

  deployer.deploy(RezToken, accounts[0], accounts[0], startBlock, endBlcok)
    .then(()    => RezToken.deployed())
    .then(rez => deployer.deploy(RezSafe, rez.address));
};
