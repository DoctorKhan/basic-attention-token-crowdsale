import Web3 from 'web3'
import { default as contract } from 'truffle-contract'
// Import our contract artifacts and turn them into usable abstractions.
import rezcoin_artifacts from '../../build/contracts/RezToken.json'

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// RezCoin is our usable abstraction, which we'll use through the code below.
var RezCoin = contract(rezcoin_artifacts);

// Bootstrap the RezCoin abstraction for Use.
RezCoin.setProvider(web3.currentProvider);

export const getAddress = async () => {
  try {
    let rez = await RezCoin.deployed()
    return rez.address
  } catch (err) {
    return 'Not Deployed'
  }
}


export const sendCoin = async (transaction) => {

  // let result = RezCoin.deployed().then(function(instance) {
  //    return instance.sendCoin(transaction.to, transaction.amount, {from: transaction.from});
  // })
  let rez = await RezCoin.deployed()
  let result = await rez.sendCoin(transaction.to, transaction.amount, {from: transaction.from});

  console.log(`result: ${result}`)
  return result

}

export const getBalance = async (address) => {
  try {
    let rez     = await RezCoin.deployed()
    let balance = await rez.balanceOf.call(address)

    return balance.toNumber()
  } catch (err) {
    return 'Not Deployed'
  }
}

export const createTokens = async (fromAddr, amount) => {
  try {
    let rez    = await RezCoin.deployed()
    let result = await rez.createTokens({from: fromAddr, value: amount})

    return result
  } catch (e) {
    return 'Not Deployed'
  }
}

export const finalize = async (fromAddr) => {
  try {
    let rez    = await RezCoin.deployed()
    let result = await rez.finalize({from: fromAddr})

    return result
  } catch (e) {
    return 'finalize failed!'
  }
}

export const refund = async (fromAddr) => {
  try {
    let rez    = await RezCoin.deployed()
    let result = await rez.refund({from: fromAddr})

    return result
  } catch (e) {
    return 'Not Deployed'
  }
}


// (Rez1-Eth1 etherValue, Rez2-Eth1 exchangeValue)
/*
    function balanceOf(address _owner) constant returns (uint256 balance);
    function transfer(address _to, uint256 _value) returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success);
    function approve(address _spender, uint256 _value) returns (bool success);
    function allowance(address _owner, address _spender) constant returns (uint256 remaining);
    function transfer(address _to, uint256 _value) returns (bool success) {
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
    function balanceOf(address _owner) constant returns (uint256 balance) {
    function approve(address _spender, uint256 _value) returns (bool success) {
    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
*/

/*
    /// @dev Accepts ether and creates new BAT tokens
    function createTokens() payable external 
    /// @dev Ends the funding period and sends the ETH home
    function finalize() external
    /// @dev Allows contributors to recover their ether in the case of a failed funding campaign. 
    function refund() external {

    event LogRefund(address indexed _to, uint256 _value);
    event CreateBAT(address indexed _to, uint256 _value);
*/
