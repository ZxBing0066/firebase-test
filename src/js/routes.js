/**
 * route配置
 */

import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import AppWrapper from './AppWrapper.jsx';

import NoMatch from './views/NoMatch.jsx';
import Index from './views/Index.jsx';
import Weather from './views/Weather.jsx';

export default (
    <Route path="/" component={ AppWrapper }>
        <IndexRoute component={ Index } />
        <Route path="weather" component={ Weather }/>        
        <Route path="*" component={NoMatch}/>
    </Route>
)