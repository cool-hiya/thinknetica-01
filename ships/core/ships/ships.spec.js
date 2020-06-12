describe('Ship', () => {
    let ship;

    beforeEach(function () {
        ship = new Ship('Ship', '123');
    });

    it('constructor should create a ship', () => {
        expect(ship.name).to.equal('Ship');
        expect(ship.model).to.equal('123');
    });

    it('should have rised anchor by default', () => {
        expect(ship.isAnchorDroped()).to.equal(false);
    });

    it('should drop anchor', () => {
        ship.dropAnchor();
        expect(ship.isAnchorDroped()).to.equal(true);
    });

    it('should rise anchor', () => {
        ship.dropAnchor();
        ship.riseAnchor();
        expect(ship.isAnchorDroped()).to.equal(false);
    });

    it('should calculate distance properly', () => {
        const distance = ship._calculateDistance(new Position(1, 5), new Position(-1, -3));
        expect(+distance.toFixed(1)).to.equal(8.2);
    });

    it('should return distance', () => {
        ship._distance = 5;
        expect(ship.getDistance()).to.equal(5);
    });

    it('shouldn\'t move if anchor is dropped', () => {
        ship.dropAnchor();

        expect(() => ship.move()).to.throw('You need to rise anchor');
        expect(() => ship.moveTo()).to.throw('You need to rise anchor');
    });

    it('should move to position and calculate distance', () => {
        const position = new Position(5, 5)
        ship.moveTo(position);

        assert.deepEqual(ship.position, position);
        expect(ship.getDistance()).not.to.equal(0);
    });

    it('should move to north', () => {
        ship.move('n');
        assert.deepEqual(ship.position, new Position(0, 1));
    });

    it('should move to west', () => {
        ship.move('w');
        assert.deepEqual(ship.position, new Position(-1, 0));
    });

    it('should move to east', () => {
        ship.move('e');
        assert.deepEqual(ship.position, new Position(1, 0));
    });

    it('should move to south', () => {
        ship.move('s');
        assert.deepEqual(ship.position, new Position(0, -1));
    });
});

describe('MotorShip', () => {

    let ship;

    beforeEach(function () {
        ship = new MotorShip('Ship', '123');
    });

    it('should extend Ship', () => {
        assert.instanceOf(ship, Ship);
    });

    it('should have enginePower', () => {
        assert.property(ship, 'enginePower');
    });

    it('should have material', () => {
        assert.property(ship, 'material');
    });
});

describe('SailShip', () => {
    let ship;

    beforeEach(function () {
        ship = new SailShip('Ship', '123');
    });

    it('should extend Ship', () => {
        assert.instanceOf(ship, Ship);
    });

    it('should have mastNumber', () => {
        assert.property(ship, 'mastNumber');
    });

    it('should have sailSquare', () => {
        assert.property(ship, 'sailSquare');
    });
});