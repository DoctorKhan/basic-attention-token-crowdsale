import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import * as rezcoin from './middleware/rezcoin.js'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tokenBalance: 0,
      ethFundAddrEthBalance: 0,
      tknFundAddrTknBalance: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  buyTokens(e) {
    e.preventDefault();

    this.state.web3.eth.getAccounts(async (e, accounts) => {
      let tokenAddr = await rezcoin.getAddress()
      let buyerAddr = accounts[2]  

      console.log('TokenAddr: ' + tokenAddr)
      console.log('BuyerAddr: ' + buyerAddr)

      await this.state.web3.eth.sendTransaction({from: buyerAddr, to: tokenAddr, value: this.state.web3.toWei(1, 'ether')})
      let balance = await rezcoin.getBalance(buyerAddr)
      return await this.setState({ tokenBalance: balance.toString(10) });
    })
  }

  finalize(e) {
    e.preventDefault();
    this.state.web3.eth.getAccounts(async (e, accounts) => {
      let tokenFundAddr = accounts[0]
      let ethFundAddr = accounts[0]

      await rezcoin.finalize(accounts[0])

      let tBalance = await rezcoin.getBalance(tokenFundAddr)
      let eBalance = await this.state.web3.fromWei(this.state.web3.eth.getBalance(ethFundAddr), 'ether')

      await this.setState({ tknFundAddrTknBalance: tBalance.toString(10) });
      await this.setState({ ethFundAddrEthBalance: eBalance.toString(10) });
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>Token ownership is: {this.state.tokenBalance}</p>
              <button onClick={(e) => this.buyTokens(e)}>Buy Tokens</button>
              <br/><br/>
              <p>Token-Fund-Address Token Balance: {this.state.tknFundAddrTknBalance}</p>
              <p>Eth-Fund-Address Eth Balance: {this.state.ethFundAddrEthBalance}</p>
              <button onClick={(e) => this.finalize(e)}>Finalize</button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
