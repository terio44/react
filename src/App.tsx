import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import DevisComponent from "./Devis";
import logo from "./assets/img/logo.png";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        {<img src={logo} className="App-logo" alt="logo" />}
      </header>
        <DevisComponent/>
    </div>
  );
};

export default App;
