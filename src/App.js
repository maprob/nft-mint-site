import './App.css';

import { useState, useEffect } from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import Mint from './components/Mint.js';
import NavBar from './components/NavBar.js';
import About from './components/About.js';
//import Team from './components/Team.js';

// Make mobile view compatible even if cant use web3 

function App() {
  const [accounts, setAccounts] = useState([]);
  const [currentComponent, setCurrentComponent] = useState(0);


  return (
    <ChakraProvider>
      <div className="overlay">
        <div className='moving-bg'></div>
        <div className="App">
            <NavBar
              accounts={accounts}
              setAccounts={setAccounts}
              currentComponent={currentComponent}
              setCurrentComponent={setCurrentComponent}
            />
            {currentComponent === 0 ?
            (
              <Mint accounts={accounts}/>
            ) :
            currentComponent === 1 ?
            (
              <About />
            ):
            (
              null
            )}
            
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
