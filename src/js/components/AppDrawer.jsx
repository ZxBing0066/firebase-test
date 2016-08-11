import React from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import uiDispatcher from '../dispatcher/uiDispatcher.js';
import dispatcherMixin from '../mixins/dispatcherMixin.js';

const ROUTE_LSIT = [
    {
        path: '/',
        name: '首页'
    }, {
        path: '/weather',
        name: '天气'
    }, {
        path: '/shadowsocks',
        name: 'shadowsocks'
    },
];

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired,
    },
    mixins: [dispatcherMixin],
    getDefaultProps() {
        return {
            defaultOpenState: false  
        };
    },
    getInitialState() {
        return {
            open: this.props.defaultOpenState
        };
    },
    componentDidMount() {
        this.dispatchers.push({
            handle: uiDispatcher.register((action) => {
                if(action.name !== 'appDrawer') {
                    return;
                };
                var nextOpenState;
                switch(action.action) {
                    case 'close': {
                        nextOpenState = false;
                        break;
                    }
                    case 'open': {
                        nextOpenState = true;
                        break;
                    }
                    case 'toggle':
                    default: {
                        nextOpenState = !this.state.open
                        break;
                    }
                };
                this.setState({
                    open: nextOpenState
                });
            }),
            dispatcher: uiDispatcher
        });
    },
    jumpToRoute(path) {
        this.context.router.push(path);
        this.setState({
            open: false
        });
    },
    render() {
        return (
            <Drawer
                docked={false}
                width={200}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
            >
                {ROUTE_LSIT.map((routeInfo, i) => {
                    return (
                        <MenuItem key={i} onTouchTap={() => this.jumpToRoute(routeInfo.path)}>
                            {routeInfo.name}
                        </MenuItem>
                    );
                })}
            </Drawer>
        );
    }
});