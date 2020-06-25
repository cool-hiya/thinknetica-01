'use strict';

const world = new World();

world.addFlight(
    new Airliner('Airbus 747', 36, 4),
    helpers.makeTime(16, 0),
    'BH118'
);

console.log(world);

world.addFlight(
    new Airliner('Airbus 749', 89, 14),
    helpers.makeTime(14, 0),
    'BH119'
);

console.log(world);

world.buyTicket('BH118', helpers.makeTime(5, 10), 'Petrov I. I.');

console.log(world);

world.buyTicket('BH118', helpers.makeTime(6, 10), 'Ivanov I. I.');

console.log(world);

world.eRegistration('BH118-0', 'Petrov I. I.', helpers.makeTime(11, 0));

console.log(world);

const report = world.getFlight('BH118').report(helpers.makeTime(8, 0));

console.table(report);

// flightDetails(world, 'BH118');
// initBuyTicketForm(world);