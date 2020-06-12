'use strict';

/**
 * 
 * @param {string} name 
 * @param {string} model 
 * @param {Position} position 
 * @param {number} mastNumber
 * @param {number} sailSquare
 */
function SailShip(name, model, mastNumber = 6, sailSquare = 130, position = new Position(0, 0)) {
    Ship.call(this);
    this.name = name;
    this.model = model;
    this.position = position;
    this.mastNumber = mastNumber;
    this.sailSquare = sailSquare;
}

SailShip.prototype = Object.create(Ship.prototype);
SailShip.prototype.constructor = Ship;