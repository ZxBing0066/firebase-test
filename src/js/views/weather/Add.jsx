import React from 'react';
import _ from 'underscore';

import AutoComplete from 'material-ui/AutoComplete';
import HardwareKeyboardBackspace from 'material-ui/svg-icons/hardware/keyboard-backspace';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';

import api from '../../stores/api.js';
import clearSetStateMixin from '../../mixins/clearSetStateMixin.js';
import noHeaderMixin from '../../mixins/noHeaderMixin.js';

export default React.createClass({
    mixins:[ clearSetStateMixin, noHeaderMixin ],
    contextTypes: {
        router: React.PropTypes.object.isRequired,
    },
    getInitialState() {
        return {
            autoCompleteDataSource: [],
        };
    },
    handleUpdateInput(value) {
        if(!value) {
            return;
        }
        var uid = _.uniqueId('weather_add_list_');
        this.uid = uid;
        return api.getCityList(value).then((res) => {
            if(uid != this.uid) return;
            var autoCompleteDataSource = _.each(res.retData, (cityInfo) => {
                cityInfo.text = `${cityInfo.province_cn} ${cityInfo.district_cn} ${cityInfo.name_cn}`;
            });
            this.setState({
                autoCompleteDataSource: autoCompleteDataSource
            });
        }).catch((e) => {
            if(uid != this.uid) return;
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
                    underlineShow={false}
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