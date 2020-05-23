describe('flightReport', () => {
    const time = new Date().setHours(8, 0, 0);
    flights = {
        BH118: {
            name: 'BH118',
            seats: 28,
            businessSeats: 4,
            registrationStarts: new Date().setHours(10, 0, 0),
            registrationEnds: new Date().setHours(15, 0, 0),
            countOfReservations: 3,
            tickets: [
                {
                    id: 'BH118-B50',
                    flight: 'BH118',
                    fullName: 'Ivanov I. I.',
                    type: 0,
                    seat: 18,
                    buyTime: new Date().setHours(2, 0, 0),
                    registrationTime: null,
                },
                {
                    id: 'BH118-B52',
                    flight: 'BH118',
                    fullName: 'Ivanov I. I.',
                    type: 0,
                    seat: 18,
                    buyTime: new Date().setHours(2, 0, 0),
                    registrationTime: time,
                }
            ],
        }
    };

    it('results with error if the flight param isn\'t a string', () => {
        expect(() => flightReport(45, time)).to.throw('Flight param should be a string');
    });

    describe('results with error if the time param isn\'t a number', () => {
        const params = [Infinity, '', NaN, undefined, {}, function () {}];

        params.forEach(param => {
            it(`when it\'s ${param}`, () => {
                expect(() => flightReport('BH118', param)).to.throw('Time param should be a number');
            });
        })
    });

    it('results with error if the flight doesn\'t exist', () => {
        expect(() => flightReport('', time)).to.throw('The flight doesn\'t exist');
    });

    it('shouldn\'t modify current flights object', () => {
        const initialObj = flights;
        const result = flightReport('BH118', time);
        assert.deepEqual(initialObj, flights);
    });

    describe("results with a proper structured object:", function () {
        const result = flightReport('BH118', time);
        const props = ['flight', 'registration', 'complete', 'countOfSeats', 'reservedSeats', 'registeredSeats', 'countOfReservations', 'countOfReverts', 'percentOfReverts']

        props.forEach(prop => {
            it(`includes \'${prop}\' property`, () => {
                expect(result[prop]).to.exist;
            });
        })
    });

    it('should create proper report', () => {
        const result = flightReport('BH118', time);

        assert.deepEqual(result, {
            flight: 'BH118',
            registration: false,
            complete: false,
            countOfSeats: 28,
            reservedSeats: 2,
            registeredSeats: 1,
            countOfReservations: 3,
            countOfReverts: 1,
            percentOfReverts: 0.33
        });
    });
});

describe('revertTicket', () => {
    const time = new Date().setHours(7, 0, 0);
    flights = {
        BH118: {
            name: 'BH118',
            seats: 28,
            businessSeats: 4,
            registrationStarts: new Date().setHours(10, 0, 0),
            registrationEnds: new Date().setHours(15, 0, 0),
            countOfReservations: 3,
            tickets: [
                {
                    id: 'BH118-B50',
                    flight: 'BH118',
                    fullName: 'Ivanov I. I.',
                    type: 0,
                    seat: 18,
                    buyTime: new Date().setHours(2, 0, 0),
                    registrationTime: null,
                },
                {
                    id: 'BH118-B52',
                    flight: 'BH118',
                    fullName: 'Ivanov I. I.',
                    type: 1,
                    seat: 18,
                    buyTime: new Date().setHours(2, 0, 0),
                    registrationTime: time,
                }
            ],
        }
    };

    it('results with error if the ticket param isn\'t a string', () => {
        expect(() => revertTicket(45, time)).to.throw('Ticket param should be a string');
    });

    describe('results with error if the time param isn\'t a number', () => {
        const params = [Infinity, '', NaN, undefined, {}, function () {}];

        params.forEach(param => {
            it(`when it\'s ${param}`, () => {
                expect(() => revertTicket('BH118-B50', param)).to.throw('Time param should be a number');
            });
        })
    });

    it('results with error if the ticket doesn\'t exist', () => {
        expect(() => revertTicket('', time)).to.throw('The ticket doesn\'t exist');
    });

    it('reverts ticket if it\'s standart and more than 3 hours before registration', () => {
        expect(revertTicket('BH118-B50', time)).to.equal(true);
    });

    it('doesn\'t revert ticket if it\'s standart and less than 3 hours before registration', () => {
        expect(revertTicket('BH118-B52', new Date().setHours(12, 0, 0))).to.equal(false);
    });

    it('doesn\'t revert ticket if it\'s business', () => {
        expect(revertTicket('BH118-B52', new Date().setHours(7, 0, 0))).to.equal(false);
    });
});