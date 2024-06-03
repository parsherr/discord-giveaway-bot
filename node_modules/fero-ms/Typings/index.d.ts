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
/** */
declare type Unit = "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "fortnight" | "month" | "year";
interface FeroMSOptions {
    /**
     * Whether or not to use longer aliases; Default: false
     */
    long?: boolean;
    /**
     * Whether ot not to make the output spaced out; Default: value for {@link FeroMSOptions.long}
     */
    spacedOut?: boolean;
    /**
     * Whether or not to add a space at the end of each unit in the output; Default: true
     */
    unitTrailingSpace?: boolean;
    /**
     * The units to not parse/output; Default: []
     */
    disabledUnits?: Unit[];
    /**
     * Whether or not to return a Date (now + result) when using the string -> number conversion: Default: true
     */
    returnDate?: boolean;
}
declare function ms<Options extends FeroMSOptions>(value: string, options?: Options): Options["returnDate"] extends false ? number : Date;
declare function ms(value: number, options?: FeroMSOptions): string;
export { ms };
