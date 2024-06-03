# Installation

npm: `npm install fero-ms`

yarn: `yarn add fero-ms`

# Importing

TypeScript: `import { ms } from "fero-ms"`

JavaScript: `const { ms } = require("fero-ms");`

# Usage

Works very similar to ms, however there are more units, options, and you can even use more than one unit at once!

```js
const { ms } = require("fero-ms");

console.log(ms("1d4h")); // Expected Output: 100800000
console.log(ms("1 day 4 hours")); // Expected Output: 100800000
console.log(ms(100800000)); // Expected Output: "1d 4h"
console.log(ms(100800000, { long: true })); // Expected Output: "1 day 4 hours"
```

# Options

```js
console.log(ms("1d4h", {
    disabledUnits: ["millisecond"], // The units not to parse/output; Default: []
    returnDate: true // Whether or not to return a Date (now + result) when using the string -> number conversion; Default: true
})); // Expected Output: 2021-09-06T01:45:51.403Z (as of time of writing);
console.log(ms(100800000, {
    long: true, // Whether or not to use longer aliases; Default: false
    spacedOut: true, // Whether ot not to make the output spaced out; Default: value for long
    unitTrailingSpace: true, // Whether or not to add a space at the end of each unit in the output; Default: true
    disabledUnits: ["millisecond"], // The units to not parse/output; Default: []
})); // Expected Output: 1 day 4 hours
```