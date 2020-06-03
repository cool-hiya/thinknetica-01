'use strict';

const ship = new Ship('Best ship', 'Cargo');

ship.moveTo({x: 10, y: 10});
ship.moveTo({x: 5, y: -8});

ship.dropAnchor();

ship.riseAnchor();

ship.move('w');

ship.moveTo({x: 0, y: 0});

console.log(ship);

const dock = new Dock();
console.log('dock', dock);

dock.moor(ship);
console.log('moor', dock);

// dock.unmoor(ship);
// console.log('ummoor', dock);
