import React from 'react';
import _ from 'underscore';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import api from '../../stores/api.js';
import databaseMixin from '../../mixins/databaseMixin.js';
import clearSetStateMixin from '../../mixins/clearSetStateMixin.js';

export default React.createClass({
    mixins: [ databaseMixin, clearSetStateMixin ],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            cityList: {},
            weather: {}
        };
    },
    componentDidMount() {
        if(this.props.location.state && this.props.location.state.addCityInfo) {
            api.addCityToUserCityList(this.props.location.state.addCityInfo).then((res) => {
                debugger
            }).catch((e) => {
                debugger
            });
        }
        this.listenCityList();
    },
    listenCityList() {
        var ref = api.getUserCityList();
        this.databaseListeners.push(ref);
        ref.on('value', (snapshot) => {
            this.setState({
                cityList: snapshot.val()
            }, this.refreshCityListWeather);
        });
    },
    refreshCityListWeather() {
        var cityList = this.state.cityList;
        _.each(cityList, (cityInfo, key) => {
            this.getRecentWeathers(cityInfo, key);
        });
    },
    getRecentWeathers(cityInfo, key) {
        var weather = this.state.weather;
        api.getRecentWeathers(cityInfo.area_id).then((res) => {
            // if(!this.isMounted()) return;
            weather[key] = res.retData;
            this.setState({
                weather: weather
            }, () => {
                console.log(this.state.weather)
            });
        });
    },
    addCity() {
        this.context.router.replace('/weather/add');
    },
    render() {
        var state = this.state,
            cityList = state.cityList,
            weather = state.weather;
        return (
            <div>
                {_.map(cityList, (cityInfo, key) => {
                    var cityWeather = weather[key] && weather[key].today || {};
                    return (
                        <Paper key={key} className='weather_city_card'>
                            <p>{cityInfo.text}</p>
                            <p>
                                最高温度: {cityWeather.hightemp}
                                <br/>
                                最低温度: {cityWeather.lowtemp}
                            </p>
                        </Paper>
                    );
                })}
                <FloatingActionButton className='weather_add' onClick={this.addCity}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
})