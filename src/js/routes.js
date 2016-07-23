/**
 * route配置
 */

import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import AppWrapper from './AppWrapper.jsx';

import Index from './views/Index.jsx';
import NoMatch from './views/NoMatch.jsx';

export default (
    <Route path="/" component={ AppWrapper }>
        <IndexRoute component={ Index } />
        <Route path="*" component={NoMatch}/>
    </Route>
)