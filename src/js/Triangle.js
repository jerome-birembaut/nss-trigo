/**
 * Created by Jerome Birembaut @Seraf_NSS on 29/01/16.
 */
function Triangle(p0, p1, p2, name) {
    this.c = p2;
    this.b = p1;
    this.a = p0;

    this.name = (name != undefined) ? name : "";
}

Triangle.prototype.ptsIntersectStrict = function(p) {
    var v0 =  this.c.subtract(this.a);
    var v1 =  this.b.subtract(this.a);
    var v2 = p.subtract(this.a);
    var dot00 = Vector2D.dot(v0, v0);
    var dot01 = Vector2D.dot(v0, v1);
    var dot02 = Vector2D.dot(v0, v2);
    var dot11 = Vector2D.dot(v1, v1);
    var dot12 = Vector2D.dot(v1, v2);
    var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    return (u >= 0) && (v >= 0) && (u + v <= 1);
};
Triangle.prototype.ptsIntersect = function(p) {
    var v0 =  this.c.subtract(this.a);
    var v1 =  this.b.subtract(this.a);
    var v2 = p.subtract(this.a);
    var dot00 = Vector2D.dot(v0, v0);
    var dot01 = Vector2D.dot(v0, v1);
    var dot02 = Vector2D.dot(v0, v2);
    var dot11 = Vector2D.dot(v1, v1);
    var dot12 = Vector2D.dot(v1, v2);
    var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    return (u > 0) && (v > 0) && (u + v < 1);
};
