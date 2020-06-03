describe('Flight', () => {
    const flight = new Flight(
        'BH118',
        new Airliner('Y-35', 19, 10),
        helpers.makeTime(14, 0),
        helpers.makeTime(18, 0),
        [new Ticket('BH118-0', 'BH118', 'Petrov', 0, 5, null)]
    )

    describe('report', () => {
        const time = new Date().setHours(8, 0, 0);

        describe('results with error if the time param isn\'t a number', () => {
            const params = [Infinity, '', NaN, undefined, {}, function () {}];

            params.forEach(param => {
                it(`when it\'s ${param}`, () => {
                    expect(() => flight.report(param)).to.throw('Time param should be a number');
                });
            })
        });

        it('should create proper report', () => {
            const result = flight.report(time);

            assert.deepEqual(result, {
                flight: 'BH118',
                registration: false,
                complete: false,
                countOfSeats: 19,
                reservedSeats: 1,
                registeredSeats: 0
            });
        });
    });

    describe('registration', () => {
        const time = helpers.makeTime(14, 0);

        it('results with error if the ticket doesn\'t exist', () => {
            expect(() => flight.eRegistration('', '', time)).to.throw('The ticket doesn\'t exist');
        });

        it('results with error if passenger name is incorrect', () => {
            expect(() => flight.eRegistration('BH118-0', '', time)).to.throw('Passenger data is incorrect');
        });

        it('results with error if invalid registration time', () => {
            expect(() => flight.eRegistration('BH118-0', 'Petrov', helpers.makeTime(8, 0))).to.throw('Invalid registartion time');
        });

        it('registers properly', () => {
            const result = flight.eRegistration('BH118-0', 'Petrov', time);
            expect(flight.tickets[0].registrationTime).to.exist;
        });
    });
})



