import './App.css';
import MintInput from './components/MainMint.js';
import NavBar from './components/NavBar.js';
import { useState } from 'react';

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="App">
      <div className="moving-bg">
          <NavBar accounts={accounts} setAccounts={setAccounts}/>
          <MintInput accounts={accounts} setAccounts={setAccounts}/>
      </div>
    </div>
  );
}

export default App;
