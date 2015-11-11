"use strict";

// This privateData variable is not available outside of the
// export. Basically it is truly private
let useWeakMap = true;

// by using a WeakMap() for privateData we get the benefit of
// ES being able to handle the Garbage collection. Using a Map
// screws this up as it will strongly hold onto the reference to
// the public object.
let privateData;

class Person {
  constructor(firstname, surname) {

    if (!privateData) {
      if (useWeakMap) {
        privateData = new WeakMap();
      } else {
        privateData = new Map();
      }
    }

    privateData.set(this, {
      firstname,
      surname,
      "massiveChunkOfPrivateData": Array.from(new Array(100000), () => "*"),
    });

  }

  static get useWeakMap() {
    return useWeakMap;
  }

  static set useWeakMap(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("useWeakMap must be boolean");
    }

    if (privateData) {
      throw new Error("privateData has already been setup");
    }

    useWeakMap = value;
  }

  get firstname() {
    return privateData.get(this).firstname;
  }

  get surname() {
    return privateData.get(this).surname;
  }

  get privateDataSize() {
    if (useWeakMap) {
      return null;
    }

    return privateData.size;
  }

  toString() {
    return `${this.firstname} ${this.surname}`;
  }
}

module.exports = exports = Person;
