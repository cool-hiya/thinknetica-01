describe('flightDetails', () => {
    const time = new Date().setHours(8, 0, 0);

    it('results with error if the flight param isn\'t a string', () => {
        expect(() => flightDetails(world, 45)).to.throw('Flight name should be a string');
    });

    it('results with error if the flight doesn\'t exist', () => {
        expect(() => flightDetails(world, '')).to.throw('Flight not found');
    });

    describe('renders properly', () => {
        flightDetails(world, 'BH118');
        const flight = world.getFlight('BH118');
        const tickets = flight.tickets;
        const result = document.querySelector('#flight-details').innerText;

        it('description', () => {
            expect(result).to.include(flight.name);
            expect(result).to.include(flight.airliner.seats);
            expect(result).to.include(flight.airliner.businessSeats);
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