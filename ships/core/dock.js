'use strict';

/**
 * 
 * @param {Position} position 
 * @param {Ship[]} ships 
 */
function Dock(position = new Position(0, 0), ships = []) {
    this.position = position;
    this.ships = ships;

    /**
     * @param {Ship} ship
     */
    this.moor = function (ship) {
        if (this._hasShip(ship)) {
            throw new Error('Already moored');
        }

        if (!this.position.isEqual(ship.position)) {
            throw new Error('Move to dock to moor');
        }

        ship.dropAnchor();
        this.ships.push(ship);
    }

    /**
     * @param {Ship} ship
     */
    this.unmoor = function (ship) {
        if (!this._hasShip(ship)) {
            throw new Error('Not in the dock');
        }

        const index = this.ships.findIndex(s => ship.name === s.name);
        this.ships.splice(index, 1);
        ship.riseAnchor();
    }

    /**
     * @param {Ship} ship
     */
    this._hasShip = function (ship) {
        return !!this.ships.find(s => ship.name === s.name);
    }
}
