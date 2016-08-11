import React from 'react';
import _ from 'underscore';

import AutoComplete from 'material-ui/AutoComplete';
import HardwareKeyboardBackspace from 'material-ui/svg-icons/hardware/keyboard-backspace';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';

import api from '../../stores/api.js';

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired,
        ui: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            autoCompleteDataSource: [],
        };
    },
    componentDidMount() {
        this.context.ui.hideHeader();
    },
    componentWillUnmount() {
        this.context.ui.showHeader();
    },
    handleUpdateInput(value) {
        if(!value) {
            return;
        }
        return api.getCityList(value).then((res) => {
            var autoCompleteDataSource = _.each(res.retData, (cityInfo) => {
                cityInfo.text = `${cityInfo.province_cn} ${cityInfo.district_cn} ${cityInfo.name_cn}`;
            });
            this.setState({
                autoCompleteDataSource: autoCompleteDataSource
            });
            console.log(autoCompleteDataSource)
        }).catch((e) => {
            this.setState({
                autoCompleteDataSource: []
            });
        });
    },
    back() {
        this.context.router.replace('/weather');
    },
    onNewRequest(info) {
        this.context.router.replace({
            pathname: '/weather',
            state: {
                addCityInfo: info
            }
        });
    },
    render() {
        return (
            <div className='line_input_wrapper'>
                <IconButton tooltip="后退" onClick={this.back}>
                    <HardwareKeyboardBackspace />
                </IconButton>
                <AutoComplete
                    openOnFocus={true}
                    onNewRequest={this.onNewRequest}
                    hintText="输入城市名称"
                    dataSource={this.state.autoCompleteDataSource}
                    dataSourceConfig={{value: 'area_id', text: 'text'}}
                    onUpdateInput={_.debounce(this.handleUpdateInput, 300)}
                    fullWidth={true}
                />
            </div>
        );
    }
});