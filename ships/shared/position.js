/**
 * 
 * @param {number} x 
 * @param {number} y 
 */
function Position(x, y) {
    this.x = x;
    this.y = y;

    this.isEqual = ({x, y}) => {
        return this.x == x && this.y === y;
    }
}