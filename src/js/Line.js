/**
 * Created by Jerome Birembaut @Seraf_NSS on 29/01/16.
 *
 * create infinite line from 2 points
 */

function Line(p0, p1, name) {

  this.p1 = p1;
  this.p0 = p0;

  this.a = (this.p1.y - this.p0.y) / (this.p1.x - this.p0.x);
  this.b = this.p1.y - (this.a * this.p1.x);

  this.name =  name || "";
}

Line.prototype.distance = function (pts) {
  return Math.abs(this.a * pts.x - pts.y + this.b) / Math.sqrt(this.a * this.a);
}

Line.prototype.getSens = function (pts) {
  var da = this.p0.y - this.p1.y;
  var db = this.p1.x - this.p0.x;
  return ((da * pts.x + db * pts.y) > (da * this.p0.x + db * this.p0.y));
}

Line.prototype.getSensNum = function (pts) {
  return (this.getSens(pts)) ? -1 : 1;
}
Line.prototype.projectedRatio = function (p) {
  var ab = Vector2D.subtract(this.p1,this.p0);
  var ab_squared = Vector2D.dot(ab, ab);
  if (ab_squared == 0) {
    return null;
  } else {
    return Vector2D.dot(Vector2D.subtract(p,this.p0), ab) / ab_squared;
  }
}
Line.prototype.pointProjectedOnSegment = function (p) {
  var r = this.projectedRatio(p);
  return new Vector2D(this.p0.x + (this.p1.x - this.p0.x) * r, this.p0.y + (this.p1.y - this.p0.y) * r);
}
Line.prototype.pointIsProjectedOnSegment = function (p) {
  var t = this.projectedRatio(p);
  if (t < 0) {
    return false;
  } else if (t > 1) {
    return false;
  } else {
    return true;
  }
}

Line.prototype.toString = function () {
  return this.name + " {" + this.p0 + "},{" + this.p1 + "}," + this.a + "," + this.b;
};
