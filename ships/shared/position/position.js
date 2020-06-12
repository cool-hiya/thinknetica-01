/**
 * 
 * @param {number} x 
 * @param {number} y 
 */
function Position(x, y) {
    this.x = x;
    this.y = y;
}

Position.prototype.isEqual = function ({x, y}) {
    return this.x == x && this.y === y;
}