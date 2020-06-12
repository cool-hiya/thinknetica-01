'use strict';

/**
 * 
 * @param {string} name 
 * @param {string} model 
 * @param {Position} position 
 * @param {number} enginePower
 * @param {string} material 
 */
function MotorShip(name, model, enginePower, material, position = new Position(0, 0)) {
    Ship.call(this);
    this.name = name;
    this.model = model;
    this.position = position;
    this.enginePower = enginePower;
    this.material = material;
}

MotorShip.prototype = Object.create(Ship.prototype);
MotorShip.prototype.constructor = Ship;