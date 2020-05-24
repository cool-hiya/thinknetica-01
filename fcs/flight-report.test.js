describe('flightReport', () => {
    const time = new Date().setHours(8, 0, 0);
    world = {
        flights: {
            BH118: {
                name: 'BH118',
                seats: 28,
                businessSeats: 4,
                registrationStarts: new Date().setHours(10, 0, 0),
                registrationEnds: new Date().setHours(15, 0, 0),
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
        }
    };

    it('results with error if the flight param isn\'t a string', () => {
        expect(() => flightReport(world, 45, time)).to.throw('Flight param should be a string');
    });

    describe('results with error if the time param isn\'t a number', () => {
        const params = [Infinity, '', NaN, undefined, {}, function () {}];

        params.forEach(param => {
            it(`when it\'s ${param}`, () => {
                expect(() => flightReport(world, 'BH118', param)).to.throw('Time param should be a number');
            });
        })
    });

    it('results with error if the flight doesn\'t exist', () => {
        expect(() => flightReport(world, '', time)).to.throw('The flight doesn\'t exist');
    });

    it('shouldn\'t modify current flights object', () => {
        const initialObj = world.flights;
        const result = flightReport(world, 'BH118', time);
        assert.deepEqual(initialObj, world.flights);
    });

    it('should create proper report', () => {
        const result = flightReport(world, 'BH118', time);

        assert.deepEqual(result, {
            flight: 'BH118',
            registration: false,
            complete: false,
            countOfSeats: 28,
            reservedSeats: 2,
            registeredSeats: 1
        });
    });
});