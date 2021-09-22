import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'; 
import App from "./App";
import Login from "./Auth/Login";
import Register from "./Auth/Register";


class AppRouter extends Component {
  render() { 
      return ( 
          <Switch>
              <Route exact path='/' component={App} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
          </Switch>
      );
  }
}
 
export default AppRouter;