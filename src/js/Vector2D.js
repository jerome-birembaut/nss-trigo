/**
 * Created by Jerome Birembaut @Seraf_NSS on 29/01/16.
 */
function Vector2D(x, y, name) {
  if (!(this instanceof Vector2D)) return new Vector2D(x, y);

  this.x = x || 0;
  this.y = y || 0;
  this.name =  name || "";

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

Vector2D.unit = function (v) {
  return Vector2D.divide(v).length();
};
Vector2D.prototype.unit = function () {
  this.divide(this.length());
  return this;
};
Vector2D.add = function (v1,v2) {
  return new Vector2D(v1.x + v2.x, v1.y + v2.y);
};
Vector2D.prototype.add = function (v) {
  this.x += v.x;
  this.y += v.y;
  return this;
};

Vector2D.subtract = function (v1,v2) {
  return new Vector2D(v1.x - v2.x, v1.y - v2.y);
};
Vector2D.prototype.subtract = function (v) {
  this.x -= v.x;
  this.y -= v.y;
  return this;
};
Vector2D.multiply = function (v,s) {
  return new Vector2D(v.x * s, v.y * s);
};
Vector2D.prototype.multiply = function (s) {
  this.x *= s;
  this.y *= s;
  return this;
};
Vector2D.divide = function (v,s) {
  return new Vector2D(v.x / s, v.y / s);
};
Vector2D.prototype.divide = function (s) {
  this.x /= s;
  this.y /= s;

  return this;
};
Vector2D.perp = function () {
  return new Vector2D(-this.y, this.x);
};
Vector2D.perpendicular = function (v1,v2) {
  return Vector2D.subtract(Vector2D.project(v1,v2));
};
Vector2D.project = function (v1,v2) {
  var percent = v1.dot(v2) / v2.dot(v2);

  return Vector2D.multiply(v2,percent);
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