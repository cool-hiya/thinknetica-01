'use strict';

/**
 * 
 * @param {Ship} shipConstructor 
 */
function Dockyard(shipConstructor) {
    this.shipConstructor = shipConstructor;
}

Dockyard.prototype = {

    build: function () {
        return new this.shipConstructor();
    },

    /**
     * 
     * @param {Ship} ship 
     */
    repair: function (ship) {
        if (!(ship instanceof this.shipConstructor)) {
            throw new Error('The dockyard doesn\'t repair this type of ships');
        }

        ship.damage = 0;
    },

    /**
     * 
     * @param {Ship} ship 
     * @param {string} color 
     */
    changeColor: function (ship, color) {
        ship.color = color;
    },

    /**
     * 
     * @param {Ship} ship 
     */
    exchange: function (ship) {
        if (!(ship instanceof this.shipConstructor)) {
            throw new Error('The dockyard doesn\'t exchange this type of ships');
        }
        return this.build();
    }
}