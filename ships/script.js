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

const motorShip = new MotorShip('MotorShip', 'T345-32', 1000, 'steel');
console.log(motorShip);

const sailShip = new SailShip('SailShip', 'G-234');
console.log(sailShip);

const dockyard = new Dockyard(MotorShip);
dockyard.repair(motorShip);

dockyard.changeColor(ship, 'red');
console.log(ship);