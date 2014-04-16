describe("Hello, World! (2+2)", function() {
  it("Jasmine Is Functioning", function() {
    expect(2+2).toBe(4);
  });
});



/*toBe: represents the exact equality (===) operator.
toEqual: represents the regular equality (==) operator.
toMatch: calls the RegExp match() method behind the scenes to compare string data.
toBeDefined: opposite of the JS "undefined" constant.
toBeUndefined: tests the actual against "undefined".
toBeNull: tests the actual against a null value - useful for certain functions that may return null, like those of regular expressions (same as toBe(null))
toBeTruthy: simulates JavaScript boolean casting.
toBeFalsy: like toBeTruthy, but tests against anything that evaluates to false, such as empty strings, zero, undefined, etc…
toContain: performs a search on an array for the actual value.
toBeLessThan/toBeGreaterThan: for numerical comparisons.
toBeCloseTo: for floating point comparisons.
toThrow: for catching expected exceptions.
*/
