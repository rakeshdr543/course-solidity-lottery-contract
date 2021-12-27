import {useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'

function App() {
  useEffect(() => {
    window.ethereum.request({ method: "eth_requestAccounts" });
 
    const web3 = new Web3(window.ethereum);
    
    console.log(web3.eth.getAccounts())
    return () => {
     
    }
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
