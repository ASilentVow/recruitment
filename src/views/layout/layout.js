import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../home/home";

export default class Layout extends Component{
  render() {
    return (
      <Switch>
        <Route exact path='/home' component={Home} />
        <Redirect from="/" to="/home" />
      </Switch>
    )
  }
}