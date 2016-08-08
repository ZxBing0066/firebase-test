export default {
    componentDidMount() {
        this.dispatchers = [];
    },
    componentWillUnmount() {
        this.dispatchers && _.each(this.dispatchers, function(dispatcher) {
            dispatcher.dispatcher.unRegister(dispatcher.handle)
        });
    },
}