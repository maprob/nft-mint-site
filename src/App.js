import './App.css';

import { useState } from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import Mint from './components/Mint.js';
import NavBar from './components/NavBar.js';

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <ChakraProvider>
      <div className="overlay">
        <div className='moving-bg'></div>
        <div className="App">
            <NavBar
              accounts={accounts}
              setAccounts={setAccounts}
            />
            <Mint accounts={accounts}
              setAccounts={setAccounts}
            />
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
