import React from 'react';


import api from '../stores/api.js';

export default React.createClass({
    testApi() {
        api.getCityList().then((res) => {
            debugger
        }).catch((e) => {
            debugger
        });
        api.getWeather({
            cityPinyin: 'chaoyang'
        }).then((res) => {
            debugger
        }).catch((e) => {
            debugger
        });
    },
    render() {
        return (
            <div>
                <p>demo index</p>
                <div>
                    <button onClick={this.testApi}>test</button>
                </div>
            </div>
        );
    }
})