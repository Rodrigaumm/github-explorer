import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard/Dashboard';
import Repository from '../pages/Repository/Repository';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/repositories/:repo+" component={Repository} />
    </Switch>
);

export default Routes;