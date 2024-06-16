const { sortPages } = require('./report');
const { test, expect } = require('@jest/globals');

test('Sortpages', () => {
  const input = {
    'https://simon.code.io/bbb': 1,
    'https://simon.code.io/aaa': 5,
    'https://simon.code.io/path': 2,
    'https://simon.code.io/another': 4,
  };
  const output = sortPages(input);
  const expected = [
    ['https://simon.code.io/aaa', 5],
    ['https://simon.code.io/another', 4],
    ['https://simon.code.io/path', 2],
    ['https://simon.code.io/bbb', 1],
  ];
  expect(output).toEqual(expected);
});
