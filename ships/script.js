'use strict';

function Dock(position = {x: 0, y: 0}, ships = []) {
    this.position = position;
    this.ships = ships;

    this.moor = function (ship) {
        if(this._hasShip(ship)){
            throw new Error('Already moored');
        }

        ship.dropAnchor();
        this.ships.push(ship);
    }

    this.unmoor = function (ship) {
        if(!this._hasShip(ship)){
            throw new Error('Not in the dock');
        }
        

    }

    this._hasShip = function (ship) {
       return !!this.ships.find(s => ship.name === s.name);
    }
}

function Ship(name, model, position = {x: 0, y: 0}) {
    this.name = name;
    this.position = position;
    this.model = model;
    this._distance = 0;
    this._isAnchorDroped = false;

    this.moveTo = function (position) {

        if (this._isAnchorDroped) {
            throw new Error('You need to rise anchor');
        }

        this.position = {
            x: position.x,
            y: position.y,
        }
    };

    this.isAnchorDroped = function () {
        return this._isAnchorDroped;
    };

    /**
     * @param {boolean} droped
     */
    this.dropAnchor = () => {
        this._isAnchorDroped = true;
    };

    this.riseAnchor = () => {
        this._isAnchorDroped = false;
    };
}

const ship = new Ship('Best ship', 'Cargo');
ship.moveTo({x: 10, y: 10});
console.log(ship);

ship.dropAnchor();

console.log(ship);

const dock = new Dock();




