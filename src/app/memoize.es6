/* eslint-disable */

class Person {
  @memoize
  get name() {
    return `${this.first} ${this.last}`;
  }
  set name(val) {
    const [first, last] = val.split(" ");
    this.first = first;
    this.last = last;
  }
}

const memoized = new WeakMap();
function memoize(target, name, descriptor) {
  const getter = descriptor.get, setter = descriptor.set;

  descriptor.get = function() {
    const table = memoizationFor(this);
    if (name in table) {
      return table[name];
    }
    return table[name] = getter.call(this);
  };

  descriptor.set = function(val) {
    const table = memoizationFor(this);
    setter.call(this, val);
    table[name] = val;
  };
}

function memoizationFor(obj) {
  let table = memoized.get(obj);
  if (!table) {
    table = Object.create(null);
    memoized.set(obj, table);
  }
  return table;
}

const simon = new Person();
simon.name = "Simon Bruce";
console.log(memoized.length);
console.log(memoized.get(simon));

const margherita = new Person();
margherita.name = "Margherita Easom";
console.log(memoized.length);
console.log(memoized.get(margherita));
