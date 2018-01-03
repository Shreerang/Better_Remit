import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeComponent from './HomeComponent'
import SelectionComponent from './SelectionComponent'
import QuotesComponent from './QuotesComponent'

import GetCorridorDetails from './getCorridorDetails'



const Main = () => (
  <Switch>
    <Route exact path='/' component={HomeComponent}/>
    <Route path='/corridorDetails' component={SelectionComponent}/>
    <Route path='/remitQuotes' component={QuotesComponent}/>

    <Route path='/remitDetails' component={GetCorridorDetails}/>
  </Switch>
)

export default Main
