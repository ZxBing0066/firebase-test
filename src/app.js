import React from 'react';
import ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import routes from './js/routes';
import user from './js/stores/user.js';
import api from './js/stores/api.js';

require('./style/main.css');


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAafl6C3o9opaeni9OvU2EGRbkvbYrJAWQ",
    authDomain: "abstract-hydra-100003.firebaseapp.com",
    databaseURL: "https://abstract-hydra-100003.firebaseio.com",
    storageBucket: "abstract-hydra-100003.appspot.com",
};

firebase.initializeApp(config);
user.init();
api.init();

ReactDom.render((
    <MuiThemeProvider>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </MuiThemeProvider>
), document.getElementById('mainContainer'));