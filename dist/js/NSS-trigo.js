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
/**
 * Created by Jerome Birembaut @Seraf_NSS on 29/01/16.
 */
function Vector2D(x, y, name) {
  if (!(this instanceof Vector2D)) return new Vector2D(x, y);

  this.x = x || 0;
  this.y = y || 0;
  this.name =  name || "";

}
//PUBLIC FUNCTION
Vector2D.prototype.length = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
Vector2D.prototype.dot = function (v) {
  return this.x * v.x + this.y * v.y;
};
Vector2D.prototype.cross = function (v) {
  return this.x * v.y - this.y * v.x;
};
Vector2D.prototype.unit = function () {
  this.divide(this.length());
  return this;
};
Vector2D.prototype.add = function (v) {
  this.x += v.x;
  this.y += v.y;
  return this;
};
Vector2D.prototype.subtract = function (v) {
  this.x -= v.x;
  this.y -= v.y;
  return this;
};
Vector2D.prototype.multiply = function (s) {
  this.x *= s;
  this.y *= s;
  return this;
};
Vector2D.prototype.divide = function (s) {
  this.x /= s;
  this.y /= s;
  return this;
};
Vector2D.prototype.toString = function () {
  return this.name + " " + this.x + "," + this.y;
};
//STATIC PUBLIC FUNCTION
/***
 * @description  return dot of 2 vector
 *
 * @param v0 first vector
 * @param v1 second vector
 * @returns {number}  dot
 */
Vector2D.dot = function (v0, v1) {
  return v0.x * v1.x + v0.y * v1.y;
};
Vector2D.cross = function (v0, v1) {
  return v0.x * v1.y - v0.y * v1.x;
};
Vector2D.unit = function (v) {
  return Vector2D.divide(v).length();
};
Vector2D.add = function (v1,v2) {
  return new Vector2D(v1.x + v2.x, v1.y + v2.y);
};
Vector2D.subtract = function (v1,v2) {
  return new Vector2D(v1.x - v2.x, v1.y - v2.y);
};
Vector2D.multiply = function (v,s) {
  return new Vector2D(v.x * s, v.y * s);
};
Vector2D.divide = function (v,s) {
  return new Vector2D(v.x / s, v.y / s);
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
Vector2D.fromPoints = function (p1, p2) {
  return new Vector2D(
    p2.x - p1.x,
    p2.y - p1.y
  );
};
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

/**
 * Created by Jerome Birembaut @Seraf_NSS on 29/01/16.
 */
function Triangle(p0, p1, p2, name) {
  this.c = p2;
  this.b = p1;
  this.a = p0;

  this.name =  name || "";
}

Triangle.prototype.ptsIntersectStrict = function(p) {
  var v0 = Vector2D.subtract(this.c,this.a);
  var v1 = Vector2D.subtract(this.b,this.a);
  var v2 = Vector2D.subtract(p,this.a);
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
  var v0 = Vector2D.subtract(this.c,this.a);
  var v1 = Vector2D.subtract(this.b,this.a);
  var v2 = Vector2D.subtract(p,this.a);
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

/**
 * Created by Jerome Birembaut @Seraf_NSS on 29/01/16.
 */
function NSSTrigo(){
}
