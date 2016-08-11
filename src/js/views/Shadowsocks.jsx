import React from 'react';

import api from '../stores/api.js';

export default React.createClass({
    add() {
        api.addShadowsocks(this.refs.input.value).then((res) => {
            this.refs.input.value = '';
        }).catch((e) => {
            alert('error');
            console.error(e);
        });
    },
    render() {
        return (
            <div>
                <div>
                    <input ref='input' type='text'/>
                    <button onClick={this.add}>add</button>
                </div>
            </div>
        );
    }
})