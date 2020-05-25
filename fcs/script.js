'use strict';

const result = addFlight(
    bigWorld,
    {
        name: 'Airbus 747',
        seats: 36,
        businessSeats: 4,
    },
    makeTime(16, 0),
    'BH118',
);

bigWorld = result.world;

console.log(bigWorld);

let res = buyTicket(bigWorld, 'BH118', makeTime(5, 10), 'Petrov I. I.');

bigWorld = res.world;
console.log(bigWorld);

let res2 = buyTicket(bigWorld, 'BH118', makeTime(6, 10), 'Ivanov I. I.');

console.log(bigWorld, res2.world);

bigWorld = res2.world;

console.log(bigWorld);

let res3 = eRegistration(bigWorld, 'BH118-0', 'Petrov I. I.', makeTime(11, 0));

bigWorld = res3.world; 

console.log(bigWorld);

const report = flightReport(bigWorld, 'BH118', makeTime(8, 0));

console.table(report);

flightDetails(bigWorld, 'BH118');