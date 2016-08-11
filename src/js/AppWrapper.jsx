import React from 'react';

import Header from './components/Header.jsx';
import AppDrawer from './components/AppDrawer.jsx';

export default React.createClass({
    childContextTypes: {
        ui: React.PropTypes.object
    },
    getChildContext: function() {
        return {
            ui: {
                // showLoading: () => this.showLoading(),
                // hideLoading: () => this.hideLoading(),
                alert: (...args) => window.alert(...args),
                confirm: (...args) => window.confirm(...args),
                showHeader: () => this.showHeader(),
                hideHeader: () => this.hideHeader(),
            }
        };
    },
    showHeader() {
        this.refs.header.show();
    },
    hideHeader() {
        this.refs.header.hide();
    },
    render() {
        return (
            <div>
                <Header ref='header' />
                <AppDrawer />
                <div style={{padding: '0 5px'}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});