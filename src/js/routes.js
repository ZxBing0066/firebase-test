/**
 * route配置
 */

import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import AppWrapper from './AppWrapper.jsx';

import NoMatch from './views/NoMatch.jsx';
import Index from './views/Index.jsx';
import Weather from './views/weather/Weather.jsx';
import WeatherAdd from './views/weather/Add.jsx';
import Shadowsocks from './views/Shadowsocks.jsx';

import userDispatcher from './dispatcher/userDispatcher.js';
import user from './stores/user.js';

var requireLogin = function(nextState, replace, callback) {
    var userState = user.getUserState();
    if(userState == 'signIn') {
        callback();
    } else if(userState == 'unknown') {
        var dispatcher = userDispatcher.register((info) => {
            if(info.action == 'userState') {
                userState = user.getUserState();
                if(userState == 'signIn') {
                    userDispatcher.unregister(dispatcher);
                    callback();
                }
            }
        })
    }
};

export default (
    <Route path="/" component={ AppWrapper }>
        <Route onEnter={ requireLogin }>
            <IndexRoute component={ Index } />
            <Route path="weather">
                <IndexRoute component={ Weather } />
                <Route path="add" component={ WeatherAdd } />
            </Route>
            <Route path="shadowsocks" component={ Shadowsocks } />
        </Route>
        <Route path="*" component={ NoMatch } />
    </Route>
);