describe('eRegistration', () => {
    const time = new Date().setHours(11, 0, 0);
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
                        registrationTime: null
                    }
                ],
            }
        }
    };

    it('results with error if the ticket doesn\'t exist', () => {
        expect(() => eRegistration(world, '', '', time)).to.throw('The ticket doesn\'t exist');
    });

    it('results with error if passenger name is incorrect', () => {
        expect(() => eRegistration(world, 'BH118-B50', '', time)).to.throw('Passenger data is incorrect');
    });

    it('results with error if invalid registration time', () => {
        expect(() => eRegistration(world, 'BH118-B50', 'Ivanov I. I.', new Date().setHours(18, 0, 0))).to.throw('Invalid registartion time');
    });

    it('registers properly', () => {
        const result = eRegistration(world, 'BH118-B50', 'Ivanov I. I.', time);
        expect(result.world.flights['BH118'].tickets[0].registrationTime).to.exist;
    });

    it('shouldn\'t modify current flights object', () => {
        const initialObj = world.flights;
        const result = eRegistration(world, 'BH118-B52', 'Ivanov I. I.', time);
        assert.deepEqual(initialObj, world.flights);
    });
});