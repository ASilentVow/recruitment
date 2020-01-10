import React from "react"
import {Switch, Route } from 'react-router-dom'
import Layout from "../views/layout/layout";
import Page from "../views/page1/page1";

const getRouter = () => (
  <Switch>
    <Route exact path='/' component={Layout} />
    <Route path='/page' component={Page} />
  </Switch>
)

export default getRouter