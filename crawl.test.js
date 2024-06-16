const { normalizeURL, getUrlsFromHTML } = require('./crawl');
const { test, expect } = require('@jest/globals');

test('Normalize URL strip https protocol', () => {
  const url = 'https://simon.code.io/path';
  const output = normalizeURL(url);
  const expected = 'simon.code.io/path';
  expect(output).toEqual(expected);
});

test('Normalize URL strip http protocol', () => {
  const url = 'http://simon.code.io/path';
  const output = normalizeURL(url);
  const expected = 'simon.code.io/path';
  expect(output).toEqual(expected);
});

test('Normalize URL strip trailing slash', () => {
  const url = 'https://simon.code.io/path/';
  const output = normalizeURL(url);
  const expected = 'simon.code.io/path';
  expect(output).toEqual(expected);
});

test('Normalize URL ensure lowercase', () => {
  const url = 'https://SiMoN.cOdE.iO';
  const output = normalizeURL(url);
  const expected = 'simon.code.io';
  expect(output).toEqual(expected);
});

test('getUrlsFromHTML returns the absolute url from a href', () => {
  const html = `
        <html>
            <body>
                <a href="https://simon.code.io/path">Link</a>
                <div>
                    <a href="/path/">Link</a>
                </div>
            </body>
        </html>
    `;
  const urlBase = 'https://simon.code.io';
  const output = getUrlsFromHTML(html, urlBase);
  const expected = ['https://simon.code.io/path', 'https://simon.code.io/path/'];
  expect(output).toEqual(expected);
});

test('getUrlsFromHTML does not return invalid url', () => {
  const html = `
          <html>
              <body>
                  <a href="invalid">Link</a>
                  <div>
                      <a href="/path/">Link</a>
                  </div>
              </body>
          </html>
      `;
  const urlBase = 'https://simon.code.io';
  const output = getUrlsFromHTML(html, urlBase);
  const expected = ['https://simon.code.io/path/'];
  expect(output).toEqual(expected);
});
