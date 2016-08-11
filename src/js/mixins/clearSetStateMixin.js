export default {
    componentWillUnmount() {
        this.setState = function() {};
    },
}