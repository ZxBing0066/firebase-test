import React from 'react';

export default {
    contextTypes: {
        ui: React.PropTypes.object.isRequired
    },
    componentDidMount() {
        this.context.ui.hideHeader();
    },
    componentWillUnmount() {
        this.context.ui.showHeader();
    },
}