import React from 'react';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

import user from '../stores/user.js';
import userDispatcher from '../dispatcher/userDispatcher.js';
import uiDispatcher from '../dispatcher/uiDispatcher.js';
import dispatcherMixin from '../mixins/dispatcherMixin.js';

export default React.createClass({
    mixins: [ dispatcherMixin ],
    getInitialState() {
        return {
            show: this.props.defaultShow == null ? true : this.props.defaultShow,
            userState: user.getUserState(),
            user: user.getUser()
        };
    },
    componentDidMount() {
        this.dispatchers.push({
            handle: userDispatcher.register((info) => {
                if(info.action = 'userState') {
                    this.setState({
                        userState: user.getUserState(),
                        user: user.getUser()
                    });
                }
            }),
            dispatcher: userDispatcher,
        });
    },
    signIn() {
        user.signIn();
    },
    signOut() {
        user.signOut();
    },
    toggleMenu(e) {
        event.preventDefault();
        this.setState({
            menuShow: !this.state.menuShow,
            anchorEl: e.currentTarget,
        });
    },
    handleRequestClose() {
        this.setState({
            menuShow: false,
        });
    },
    toggleAppDrawer() {
        uiDispatcher.dispatch({
            name: 'appDrawer',
            action: 'toggle'
        });
    },
    show() {
        this.setState({
            show: true
        });
    },
    hide() {
        this.setState({
            show: false
        });
    },
    render() {
        return (
            this.state.show ?
            <div className='header'>
                <AppBar
                    title='Title'
                    onLeftIconButtonTouchTap={this.toggleAppDrawer}
                    iconElementRight={
                        <div>
                            <Avatar
                                src={this.state.user && this.state.user.photoURL}
                                onClick={(e) => this.toggleMenu(e)}
                            />
                            <Popover
                                open={this.state.menuShow}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                onRequestClose={() => this.handleRequestClose()}>
                                <Menu>
                                    {this.state.userState == 'signIn' ?
                                        <MenuItem primaryText='退出登录' />
                                        : null
                                    }
                                </Menu>
                            </Popover>
                        </div>
                    }
                />
            </div> : null
        );
    }
});