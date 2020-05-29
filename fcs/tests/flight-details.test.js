describe('flightDetails', () => {
    const time = new Date().setHours(8, 0, 0);

    it('results with error if the flight param isn\'t a string', () => {
        expect(() => flightDetails(bigWorld, 45)).to.throw('Flight name should be a string');
    });

    it('results with error if the flight doesn\'t exist', () => {
        expect(() => flightDetails(bigWorld, '')).to.throw('The flight doesn\'t exist');
    });

    describe('renders properly', () => {
        flightDetails(bigWorld, 'BH118');
        const flight = bigWorld.flights['BH118'];
        const tickets = flight.tickets;
        const result = document.querySelector('#flight-details').innerText;

        it('description', () => {
            expect(result).to.include(flight.name);
            expect(result).to.include(flight.seats);
            expect(result).to.include(flight.businessSeats);
            expect(result).to.include(new Date(flight.registrationStarts).toLocaleString('ru'));
            expect(result).to.include(new Date(flight.registrationEnds).toLocaleString('ru'));
        });

        it('tickets', () => {
            tickets.forEach(ticket => {
                expect(result).to.include(ticket.id);
                expect(result).to.include(ticket.seat);
                expect(result).to.include(ticket.fullName);
            });
        });
    });
});