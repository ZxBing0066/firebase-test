import React from 'react';

import Header from './components/Header.jsx';
import AppDrawer from './components/AppDrawer.jsx';

export default React.createClass({
    render() {
        return (
            <div>
                <Header />
                <AppDrawer />
                {this.props.children}
            </div>
        );
    }
})