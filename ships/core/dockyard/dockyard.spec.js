describe('Dockyard', () => {

    it('should build ship of proper type', () => {
        const dockyard = new Dockyard(MotorShip);
        assert.instanceOf(dockyard.build(), MotorShip);
    });

    it('should repear ship of proper type', () => {
        const ship = new MotorShip();
        ship.damage = 5;

        const dockyard = new Dockyard(MotorShip);
        dockyard.repair(ship);

        expect(ship.damage).to.equal(0);
    });

    it('shouldn\'t repear ship of improper type', () => {
        const ship = new SailShip();
        ship.damage = 5;

        const dockyard = new Dockyard(MotorShip);

        expect(() => dockyard.repair(ship)).to.throw('The dockyard doesn\'t repair this type of ships');
    });

    it('should change color', () => {
        const ship = new SailShip();

        const dockyard = new Dockyard(MotorShip);
        dockyard.changeColor(ship, 'red');

        expect(ship.color).to.equal('red');
    });

    it('should exchange ship of proper type', () => {
        let ship = new MotorShip('Ship');
        const dockyard = new Dockyard(MotorShip);

        ship = dockyard.exchange(ship);

        assert.deepEqual(ship, new MotorShip());
    });

    it('shouldn\'t exchange ship of improper type', () => {
        let ship = new SailShip('Ship');
        const dockyard = new Dockyard(MotorShip);

        expect(() => dockyard.exchange(ship)).to.throw('The dockyard doesn\'t exchange this type of ships');
    });
});