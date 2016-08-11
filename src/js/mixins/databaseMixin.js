import _ from 'underscore';

export default {
    componentDidMount() {
        this.databaseListeners = [];
    },
    componentWillUnmount() {
        _.each(this.databaseListeners, function(databaseListener) {
            databaseListener.off();
        });
    },
}