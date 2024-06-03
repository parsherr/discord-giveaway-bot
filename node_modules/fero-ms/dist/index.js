"use strict";
/**
 * Copyright 2021 Ferotiq
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ms = void 0;
const unitToUnix = {
    millisecond: 1,
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000,
    week: 604800000,
    fortnight: 1209600000,
    month: 2592000000,
    year: 31536000000
}, aliases = {
    millisecond: ["ms", "millisecond", "milliseconds"],
    second: ["s", "second", "seconds"],
    minute: ["min", "mins", "minute", "minutes"],
    hour: ["h", "hr", "hrs", "hour", "hours"],
    day: ["d", "day", "days"],
    week: ["w", "week", "weeks"],
    fortnight: ["fn", "fortnight", "fortnights"],
    month: ["m", "month", "months"],
    year: ["y", "year", "years"]
}, aliasesEntries = Object.entries(aliases), units = Object.keys(unitToUnix), none = [undefined, null], numberSplit = /[0-9.\-]+/, unitSplit = /[a-zA-Z]+/, filter = (el) => el != "";
function ms(value, options) {
    const long = none.includes(options?.long) ? false : options.long, spacedOut = none.includes(options?.spacedOut)
        ? long
        : options.spacedOut, unitTrailingSpace = none.includes(options?.unitTrailingSpace)
        ? true
        : options.unitTrailingSpace, disabledUnits = none.includes(options?.disabledUnits)
        ? []
        : options.disabledUnits, returnDate = none.includes(options?.returnDate)
        ? true
        : options.returnDate;
    switch (typeof value) {
        case "number":
            let left = value, done = "", unit = "year";
            while (left > 0) {
                const unitAmount = unitToUnix[unit];
                const toSub = left - (left % unitAmount), converted = toSub / unitToUnix[unit];
                left -= toSub;
                const pl = converted != 1 ? "s" : "";
                if (toSub != 0 && !disabledUnits?.includes(unit))
                    done += `${converted}${spacedOut ? " " : ""}${long ? unit + pl : aliases[unit][0]}${unitTrailingSpace ? " " : ""}`;
                unit = units[units.indexOf(unit) - 1];
            }
            return done.trim();
        case "string":
            const toParseSpaceless = value.replace(/ /g, "");
            const u = toParseSpaceless
                .split(numberSplit)
                .filter(filter)
                .map(el => unitToUnix[aliasesEntries.find(([key, al]) => al.includes(el))[0]]);
            const n = toParseSpaceless
                .split(unitSplit)
                .filter(filter)
                .map(parseFloat);
            const reduced = n.reduce((num, el, i) => num + el * u[i], 0);
            return returnDate ? new Date(Date.now() + reduced) : reduced;
        default:
            throw new Error("Fero-MS: toParse is not of type string or number");
    }
}
exports.ms = ms;
