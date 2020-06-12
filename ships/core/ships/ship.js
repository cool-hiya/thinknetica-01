'use strict';

/**
 * 
 * @param {string} name 
 * @param {string} model 
 * @param {Position} position 
 */
function Ship(name, model, position = new Position(0, 0), damage = 0, color) {
    this.name = name;
    this.position = position;
    this.model = model;
    this.damage = damage;
    this.color = color;
    this._distance = 0;
    this._isAnchorDroped = false;
}

Ship.prototype = {

    /**
     * @param {Position} position
     */
    moveTo: function (position) {

        if (this._isAnchorDroped) {
            throw new Error('You need to rise anchor');
        }

        this._distance += this._calculateDistance(this.position, position);

        this.position = new Position(position.x, position.y);
    },

    /**
     * @param {'w' | 's' | 'e' | 'n'} direction
     */

    move: function (direction) {
        if (this._isAnchorDroped) {
            throw new Error('You need to rise anchor');
        }

        let {x, y} = this.position;

        switch (direction) {
            case 'n':
                y++;
                break;
            case 'w':
                x--;
                break;
            case 'e':
                x++;
                break;
            case 's':
                y--;
                break;
        }

        this.moveTo(new Position(x, y));
    },

    getDistance: function () {
        return this._distance;
    },

    isAnchorDroped: function () {
        return this._isAnchorDroped;
    },

    dropAnchor: function () {
        this._isAnchorDroped = true;
    },

    riseAnchor: function () {
        this._isAnchorDroped = false;
    },

    /**
     * @param {position} positionA
     * @param {position} positionB
     */
    _calculateDistance: function (positionA, positionB) {
        const {x: x1, y: y1} = positionA;
        const {x: x2, y: y2} = positionB;

        return +Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    }
};