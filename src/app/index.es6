"use strict";

function* channel () {
  console.log(1);
  const name = yield "hello, what is your name?"; // [1]
  console.log(2);
  return `well hi there ${name}`;
}

function* chatter (value) {
  let valueNew = value;

  do {
    valueNew = valueNew * 2;
    yield valueNew;
  } while(valueNew < 1000000);
}

const gen = channel();
console.log(gen.next());
console.log(gen.next("billy"));

for (const value of chatter(10)) {
  console.log(value);
}

function superhero(isSuperhero) {
  return function(target) {
    target.isSuperhero = isSuperhero;
  };
}

@superhero(true)
class Superman {
}

console.log(`Superman is superhero: ${Superman.isSuperhero}`);
