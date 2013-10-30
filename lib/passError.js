(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.passError = factory();
    }
}(this, function () {
    return function passError(errorCallback, successCallback) {
        if (typeof errorCallback !== 'function' || typeof successCallback !== 'function') {
            throw new Error('passError: Two function arguments required');
        }
        return function (err) { // ...
            if (err) {
                errorCallback(err);
            } else {
                successCallback.apply(this, [].slice.call(arguments, 1));
            }
        };
    };
}));
