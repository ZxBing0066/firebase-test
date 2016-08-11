import _ from 'underscore';

export default {
    componentDidMount() {
        this.dispatchers = [];
    },
    componentWillUnmount() {
        _.each(this.dispatchers, function(dispatcher) {
            dispatcher.dispatcher.unregister(dispatcher.handle)
        });
    },
}