export class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  export default class Bezier {
    constructor(p0,p1,p2,p3) {
      this.p0 = p0;
      this.p1 = p1;
      this.p2 = p2;
      this.p3 = p3;
    }

    point(time) {
      const x = this.x(time);
      const y = this.y(time);
      return new Vector(x, y);
    }

    x(time) {
      return this.value(time, 'x');
    }

    y(time) {
      return this.value(time, 'y');
    }

    /*
     * Parametric function of a cubic bézier curve
     * Applied on the [variable] axis, which is 'x' or 'y'
     */
    value(time, variable) {
      const oppTime = 1 - time;

      return this.p0[variable] * (oppTime ** 3) +
        this.p1[variable] * 3 * oppTime ** 2 * time +
        this.p2[variable] * 3 * oppTime * (time ** 2) +
        this.p3[variable] * time ** 3;
    }

    pathString() {
      return `M${this.p0.x},${this.p0.y} C${this.p1.x},${this.p1.y} ${this.p2.x},${this.p2.y} ${this.p3.x},${this.p3.y}`;
    }

  }
