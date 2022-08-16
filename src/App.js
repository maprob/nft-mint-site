import './App.css';
import MintInput from './components/MainMint.js';
import NavBar from './components/NavBar.js';
import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <ChakraProvider>
      <div className="overlay">
        <div className="App">
            <NavBar accounts={accounts} setAccounts={setAccounts}/>
            <MintInput accounts={accounts} setAccounts={setAccounts}/>
        </div>
        <div className='moving-bg'></div>
      </div>
    </ChakraProvider>
  );
}

export default App;
