import React, { Component } from "react";
import MyContract from "./contracts/MyContract.json";
import Web3 from 'web3';
import "./App.css";
import Layer from './Layer';
import "bootstrap/dist/css/bootstrap.css";
import { Navbar} from 'react-bootstrap';
class App extends Component {


  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = MyContract.networks[networkId]
    if(networkData) {
      const instance = new web3.eth.Contract(MyContract.abi, networkData.address)
      this.setState({ instance })
      const storedData = await instance.methods.storedData().call()
      this.setState({ storedData })
      // Write your logic to load data stored in your Smart Contract
      this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({ loading: false})
    } else {
      window.alert('MyContract not deployed to detected network.')
    }
  }

  constructor(props){
    super(props)
    this.state = {
      account: '',
      constructorVariable: '',
      constructorArray: [],
      loading: true,
      storedData: 0
  }

    this.smartContractFunctionName = this.smartContractFunctionName.bind(this)
    this.get = this.get.bind(this)
  }

  smartContractFunctionName(parameter){
    this.setState({ loading: true })
    this.state.instance.methods.smartContractFunctionName(parameter).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  get(){
    this.setState({ loading: true })
    // Get the value from the contract to prove it worked.
    const response = this.state.instance.methods.get().call()
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    this.setState({storedData: response})
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      
      <div className="App">
        
      <Navbar bg="dark" variant="dark" height="30">
        <Navbar.Brand >
         Notice Board
        </Navbar.Brand>
      </Navbar>

      
        
          <div class="InputBox">
                { this.state.loading
                  ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                  : <Layer
                    //constructorVariable={this.state.constructorVariable}
                    //constructorArray={this.state.constructorArray}
                    smartContractFunctionName={this.smartContractFunctionName} />
                }
          </div>
             
            <div class="Notice">
                <h2>NOTICE</h2>
            </div>  

            <div class="NoticeBody" >
            <h5>
                  {this.state.storedData}
                </h5>
            </div>  

        </div>
      
      
    );
  }
}

export default App;


