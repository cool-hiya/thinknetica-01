'use strict';

/**
 * 
 * @param {string} fullName 
 */

function Student(fullName) {
    const [lastName, name, patronymic] = fullName.split(' ');

    this.name = name;
    this.lastName = lastName;
    this.patronymic = patronymic;

    this._fullName = fullName;
    this._isHealthy = true;
    this._isAbsent = false;

    this.getFullName = function () {
        return this._fullName;
    }

    this.getInitials = function () {
        return `${this.lastName} ${this.name[0]}. ${this.patronymic[0]}.`
    }

    this.isHealthy = function () {
        return this._isHealthy;
    }

    this.isAbsent = function () {
        return this._isAbsent
    }

    this.getSick = function () {
        this._isHealthy = false;
    }

    this.recover = function () {
        this._isHealthy = true;
    }

    this.skipLesson = function () {
        this._isAbsent = true;
    }

    this.attendLesson = function () {
        this._isAbsent = false;
    }
}