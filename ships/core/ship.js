'use strict';

/**
 * 
 * @param {string} name 
 * @param {string} model 
 * @param {Position} position 
 */
function Ship(name, model, position = new Position(0, 0)) {
    this.name = name;
    this.position = position;
    this.model = model;
    this._distance = 0;
    this._isAnchorDroped = false;

    /**
     * @param {Position} position
     */
    this.moveTo = function (position) {

        if (this._isAnchorDroped) {
            throw new Error('You need to rise anchor');
        }

        this._distance += this._calculateDistance(this.position, position);

        this.position = new Position(position.x, position.y);
    };

    /**
     * @param {'w' | 's' | 'e' | 'n'} direction
     */

    this.move = function (direction) {
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
    }

    this.getDistance = function () {
        return this._distance();
    }

    this.isAnchorDroped = function () {
        return this._isAnchorDroped;
    };

    this.dropAnchor = () => {
        this._isAnchorDroped = true;
    };

    this.riseAnchor = () => {
        this._isAnchorDroped = false;
    };

    /**
     * @param {position} positionA
     * @param {position} positionB
     */
    this._calculateDistance = function (positionA, positionB) {
        const {x: x1, y: y1} = positionA;
        const {x: x2, y: y2} = positionB;

        return +Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    }
}
