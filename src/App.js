import React from "react";
import Layout from "./views/layout/layout";
import 'antd/dist/antd.css'
import { HashRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' component={Layout} />
        </Switch>
      </Router>
    </div>
  );
}