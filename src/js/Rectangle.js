/**
 * Created by Jerome Birembaut @Seraf_NSS on 29/01/16.
 */
var rect = Rectangle = function (x, y, w, h, name) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h

  this.name =  name || "";
};
Rectangle.prototype.pointIntersect = function (p) {
    return p.x > this.x && p.x < this.x + this.w && p.y > this.y && p.y < this.y + this.h;
}
Rectangle.pointIntersect = function (p, r) {
    return p.x > r.x && p.x < r.x + r.w && p.y > r.y && p.y < r.y + r.h;
}