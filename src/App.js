import React from 'react';
import { Link } from "react-router-dom";
import Router from "./router/router";

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to='/'>layout</Link>
        </li>
        <li>
          <Link to='/page'>page</Link>
        </li>
      </ul>
      <Router></Router>
    </div>
  );
}

export default App;
