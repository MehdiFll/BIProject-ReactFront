import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import {Graph1} from './components/graph1';
function App() {
  return (
    <div className="layout-main">
 
    <Route path="/graph1" component={Graph1} />
    

</div>
  );
}

export default App;
