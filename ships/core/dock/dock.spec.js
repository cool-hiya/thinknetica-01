describe('Dock', () => {

    it('constructor should create empty dock on 0 position by default', () => {
        const dock = new Dock();
        const defaultDock = new Dock(new Position(0, 0), []);

        assert.deepEqual(dock, defaultDock);
    });

    it('constructor should create dock with specified position and ships', () => {
        const ship = new Ship('ship', 't-452');
        const dock = new Dock(new Position(10, 20), [ship]);

        expect(dock.position.x).to.equal(10);
        expect(dock.position.y).to.equal(20);
        assert.deepEqual(dock.ships[0], ship);
    });

    describe('should service ships:', () => {

        it('moor and drop anchor', () => {
            const ship = new Ship('ship', 't-452');
            const dock = new Dock();

            dock.moor(ship);

            expect(dock.ships.length).to.equal(1);
            expect(ship.isAnchorDroped()).to.equal(true);
        });

        it('throw error if the ship is far away the dock', () => {
            const ship = new Ship('ship', 't-452');
            const dock = new Dock(new Position(10, 10));

            expect(() => dock.moor(ship)).to.throw('Move to dock to moor');
        });

        it('throw error if the ship is already moored', () => {
            const ship = new Ship('ship', 't-452');
            const dock = new Dock(new Position(10, 10), [ship]);

            expect(() => dock.moor(ship)).to.throw('Already moored');
        });

        it('unmoor and raise anchor', () => {
            const ship = new Ship('ship', 't-452');
            const dock = new Dock(new Position(0, 0), [ship]);
            ship.dropAnchor();

            dock.unmoor(ship);

            expect(ship.isAnchorDroped()).to.equal(false);
            expect(dock.ships.length).to.equal(0);
        });

        it('throw error if the ship isn\'t in the dock', () => {
            const ship = new Ship('ship', 't-452');
            const dock = new Dock();

            expect(() => dock.unmoor(ship)).to.throw('Not in the dock');
        });

    });
});