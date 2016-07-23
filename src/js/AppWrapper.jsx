import React from 'react';

export default React.createClass({
    render() {
        return (
            <div>
                <h1>demo wrapper</h1>
                {this.props.children}
            </div>
        );
    }
})