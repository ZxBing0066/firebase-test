import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

import api from '../stores/api.js';

export default React.createClass({
    getInitialState() {
        return {
            cityList: [],
            weather: {}
        };
    },
    refreshCityList() {
        var cityName = this.refs.cityName.getValue();
        if(!cityName) {
            return;
        }
        api.getCityList(cityName).then((res) => {
            this.setState({
                cityList: res.retData
            });
            debugger
        }).catch((e) => {
            debugger
        });
    },
    getRecentWeathers(cityInfo) {
        api.getRecentWeathers(cityInfo.area_id).then((res) => {
            this.setState({
                weather: res.retData
            })
        }).catch((e) => {
            debugger
        });
    },
    render() {
        var state = this.state,
            weather = state.weather,
            today = weather.today;
        return (
            <div>
                <TextField
                    ref='cityName'
                    hintText='请输入城市名称'
                    floatingLabelText='城市名称'
                    fullWidth={true}
                />
                <RaisedButton
                    fullWidth={true}
                    label={<span>获取</span>}
                    onClick={this.refreshCityList}
                />
                <Paper>
                    <List className='city_list'>
                        {this.state.cityList.map((cityInfo, i) => {
                            return (
                                <ListItem
                                    onClick={() => this.getRecentWeathers(cityInfo)}
                                    key={i}
                                    primaryText={`${cityInfo.province_cn} ${cityInfo.district_cn} ${cityInfo.name_cn}`}
                                />
                            );
                        })}
                    </List>
                </Paper>
                {today ?
                    <Paper>
                        {`日期: ${today.date}`}
                        {`最低温度: ${today.lowtemp}`}
                        {`最高温度: ${today.hightemp}`}
                        {`当前温度: ${today.curTemp}`}
                    </Paper>
                    : null
                }
            </div>
        );
    }
})