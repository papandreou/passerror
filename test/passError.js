var expect = require('unexpected-sinon'),
    sinon = require('sinon'),
    passError = require('../lib/passError');

describe('passError', function () {
    describe('called with a successCallback and an errorCallback', function () {
        var successCallback,
            errorCallback;
        beforeEach(function () {
            successCallback = sinon.spy();
            errorCallback = sinon.spy();
        });

        it('should call the successCallback with the correct arguments on success', function () {
            passError(errorCallback, successCallback)(null, 1, 2, 3);
            expect(errorCallback, 'was not called');
            expect(successCallback, 'was called once');
            expect(successCallback, 'was called with', 1, 2, 3);
        });

        it('should call the errorCallback with the correct arguments on success', function () {
            var err = new Error('foo');
            passError(errorCallback, successCallback)(err);
            expect(errorCallback, 'was called once');
            expect(errorCallback, 'was called with', err);
            expect(successCallback, 'was not called');
        });

        it('should throw an error if called twice', function () {
            var fn = passError(errorCallback, successCallback);
            fn();
            expect(errorCallback, 'was not called');
            expect(successCallback, 'was called once');
            expect(fn, 'to throw exception', 'passError: The callback was called more than once');
            expect(errorCallback, 'was not called');
            expect(successCallback, 'was called once');
        });
    });

    it('should throw an error when given wrong arguments', function () {
        [[1, 4], [{}, []], [], [function () {}], [null, function () {}]].forEach(function (args) {
            expect(function () {
                passError.apply(this, args);
            }, 'to throw exception', 'passError: Two function arguments required');
        });
    });
});
