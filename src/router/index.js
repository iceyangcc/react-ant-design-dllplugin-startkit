import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../components/containers/dashboard'
import Test from '../components/containers/test'
import NotFound from '../components/basic/404/'

const SideMenuRoutes = () => (
  <Switch>
    <Route path='/' exact component={Dashboard} />
    <Route path='/test' exact component={Test} />
    <Route path='*' component={NotFound}/>
  </Switch>
)

export default SideMenuRoutes