'use strict';

class CustomPromise {
    constructor(callback) {
        this._status = 'pending';
        this._callback = callback;
        this._success = [];
        this._error = [];

        if (callback) {
            setTimeout(() => this._callback(this._resolve.bind(this), this._reject.bind(this)));
        }
    }

    then(successCallback, errorCallback) {

        if (successCallback) {
            this._success.push(successCallback);
        }

        if (errorCallback) {
            this._error.push(errorCallback);
        }

        if (this._status === 'fulfilled') {
            this._success.forEach(cb => this._value = cb(this._value) || this._value);
            this._success = [];
        }

        if (this._status === 'rejected') {
            this._error.forEach(cb => this._value = cb(this._value) || this._value);
            this._error = [];
        }

        return this;
    }

    catch(errorCallback) {
        this.then(null, errorCallback);
    }

    _resolve(value) {
        this._status = 'fulfilled';
        this._value = value;

        this._success.forEach(cb => this._value = cb(this._value) || this._value);
    }

    _reject(value) {
        this._status = 'rejected';
        this._value = value;

        this._error.forEach(cb => this._value = cb(this._value) || this._value);
    }

    resolve(value) {
        this._resolve(value);
    }

    reject(value) {
        this._reject(value);
    }
}

const promise1 = new CustomPromise((resolve, reject) => {
    setTimeout(() => resolve(13), 1000);
});

promise1.then(r => console.log('Promise ' + r));

const promise2 = new CustomPromise((resolve, reject) => {
    setTimeout(() => reject(10), 500);
});

promise2.then(null, r => console.log('Promise ' + r));

const promise3 = new CustomPromise((resolve, reject) => {
    setTimeout(() => reject(100), 5000);
});

promise3.catch(r => console.log('Promise ' + r));

const promise4 = new CustomPromise();
promise4.resolve(56);

promise4.then(r => console.log(r));
promise4.then(r => console.log(r));
promise4.then(r => console.log(r));
promise4.then(r => console.log(r));

const promise5 = new CustomPromise();
promise5.reject();

const promise6 = new CustomPromise((resolve, reject) => {
    setTimeout(() => resolve(23), 1000);
});

promise6
    .then((r) => r + 1)
    .then(r => console.log('promise6 ' + r));

// promise6.then(r => console.log(r));
// promise6.then(r => console.log(r));