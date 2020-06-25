describe('Position', () => {

    it('should create xy position', () => {
        const position = new Position(10, 10);

        expect(position.x).to.equal(10);
        expect(position.y).to.equal(10);
    });

    it('should compare 2 positions and return false', () => {
        const positionA = new Position(10, 10);
        const positionB = new Position(0, 10);

        expect(positionA.isEqual(positionB)).to.equal(false);
    });

    it('should compare 2 positions and return true', () => {
        const positionA = new Position(10, 10);
        const positionB = new Position(10, 10);

        expect(positionA.isEqual(positionB)).to.equal(true);
    });
});