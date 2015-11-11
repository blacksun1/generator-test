"use strict";

const memwatch = require("memwatch-next");
const Person = require("./person.js");

function getConfig() {
  if (process.argv.length > 3) {
    throw TypeError();
  }

  const config = {
    useWeakMap: true,
  };

  if (process.argv.length <= 2) {
    return config;
  }

  if (process.argv[2].toLowerCase() === "true") {
    return config;
  }

  if(process.argv[2].toLowerCase() === "false") {
    config.useWeakMap = false;
    return config;
  }

  throw TypeError();
}

const config = getConfig();
Person.useWeakMap = config.useWeakMap;

// memwatch.on("leak", function(info) {
//   console.log("MemWatch is recording a leak!");
//   console.log(JSON.stringify(info, null, 2));
// });

// memwatch.on("stats", function(info) {
//   console.log("MemWatch is wanting to let us know some stats");
//   console.log(JSON.stringify(info, null, 2));
// });

function doOne() {
  const people = [
    new Person("Simon", "Bruce"),
    new Person("Margherita", "Easom"),
    new Person("Sebastian", "Bruce"),
    new Person("James", "Bruce"),
  ];

  const allThePeople = people.map(person => `${person.surname.toUpperCase()}, ${person.firstname}`);

  return allThePeople;
}

let hd;
let diff;

function doHeapDiff() {
  if (hd) {
    process.stdout.write("Calculating HeapDiff... ");
    diff = hd.end();
    process.stdout.write("done.\n");
    console.log(`size: before: ${diff.before.size}`);
    console.log(`      after:  ${diff.after.size}`);
  }

  hd = new memwatch.HeapDiff();
}

function doIterations(numberOfIterations, iterationIndex) {
  doHeapDiff();

  if (iterationIndex >= numberOfIterations) {
    console.log("Finished");
    return;
  }

  console.log(`Iteration ${iterationIndex + 1} of ${numberOfIterations}`);
  for (let i = 0; i < 100; i += 1) {
    if (i === 0) {
      process.stdout.write("0");
    }

    doOne();

    if (i % 25 === 0 && i > 0) {
      process.stdout.write(`... ${i}`);
    }
  }
  process.stdout.write("\n");

  // console.log(`Private data size is ${people.privateDataSize}`);
  process.nextTick(doIterations.bind(null, numberOfIterations, iterationIndex + 1));
}

console.log("Ready, set, go!");
console.log(`Doing a test with useWeakMap = ${Person.useWeakMap}`);
doIterations(5, 0);
