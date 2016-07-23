import React from 'react';
import ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './js/routes';

require('./style/main.css');

ReactDom.render((
    <Router history={browserHistory}>
        {routes}
    </Router>
), document.getElementById('mainContainer'));