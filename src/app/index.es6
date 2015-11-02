"use strict";

function* channel () {
    const name = yield "hello, what is your name?"; // [1]
    return `well hi there ${name}`;
}

function* chatter (value) {
    let valueNew = value * 2;
    do {
        yield valueNew;
        valueNew = valueNew * 2;
    } while(valueNew < 100000);
}

const gen = channel();
console.log(gen.next()); // hello, what is your name? [2]
console.log(gen.next("billy")); // well hi there billy [3]

for (const value of chatter(10)) {
    console.log(value);
}
