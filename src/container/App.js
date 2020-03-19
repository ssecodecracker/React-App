import React from 'react';
import {IndexPage} from '../components/indexPage/indexPage';
import '../vendor/bootstrap.grid.css';
import './App.css';

function App() {
  return (
    <div>
      <header><h1><span>XT</span> Problem Statement</h1></header>
      <div className="container-fluid">
          <IndexPage></IndexPage>
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
