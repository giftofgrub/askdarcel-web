import React from 'react';
import { Route, Switch } from 'react-router-dom';

import About from './pages/About';

export default () => (
  <Switch>
    <Route path="/about" component={About} />
  </Switch>
);
