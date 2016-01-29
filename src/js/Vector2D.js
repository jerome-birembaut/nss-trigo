/**
 * Created by Jerome Birembaut @Seraf_NSS on 29/01/16.
 */
function Vector2D(x, y, name) {

    if (arguments.length > 0) {
        this.x = x;
        this.y = y;
    } else {
        this.x = 0;
        this.y = 0;
    }

    this.name = (name != undefined) ? name : "";

}
Vector2D.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};
Vector2D.prototype.dot = function (v) {
    return this.x * v.x + this.y * v.y;
};
Vector2D.dot = function (v0, v1) {
    return v0.x * v1.x + v0.y * v1.y;
}
Vector2D.prototype.cross = function (v) {
    return this.x * v.y - this.y * v.x;
}
Vector2D.cross = function (v0, v1) {
    return v0.x * v1.y - v0.y * v1.x;
}
Vector2D.prototype.unit = function () {
    return this.divide(this.length());
};
Vector2D.prototype.unitEquals = function () {
    this.divideEquals(this.length());
    return this;
};
Vector2D.prototype.add = function (v) {
    return new Vector2D(this.x + v.x, this.y + v.y);
};
Vector2D.prototype.addEquals = function (v) {
    this.x += v.x;
    this.y += v.y;
    return this;
};
Vector2D.prototype.subtract = function (v) {
    return new Vector2D(this.x - v.x, this.y - v.y);
};
Vector2D.prototype.subtractEquals = function (v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
};
Vector2D.prototype.multiply = function (s) {
    return new Vector2D(this.x * s, this.y * s);
};
Vector2D.prototype.multiplyEquals = function (s) {
    this.x *= s;
    this.y *= s;
    return this;
};
Vector2D.prototype.divide = function (s) {
    return new Vector2D(this.x / s, this.y / s);
};
Vector2D.prototype.divideEquals = function (s) {
    this.x /= s;
    this.y /= s;

    return this;
};
Vector2D.prototype.perp = function () {
    return new Vector2D(-this.y, this.x);
};
Vector2D.prototype.perpendicular = function (v) {
    return this.subtract(this.project(v));
};
Vector2D.prototype.project = function (v) {
    var percent = this.dot(v) / v.dot(v);

    return v.multiply(percent);
};
Vector2D.prototype.toString = function () {
    return this.name + " " + this.x + "," + this.y;
};
Vector2D.fromPoints = function (p1, p2) {
    return new Vector2D(
        p2.x - p1.x,
        p2.y - p1.y
    );
};