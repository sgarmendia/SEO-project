const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function normalizeURL(urlString) {
  const urlObject = new URL(urlString);

  const url = `${urlObject.hostname}${urlObject.pathname}`;

  if (url.endsWith('/')) {
    return url.slice(0, -1);
  }

  return `${urlObject.host}${urlObject.pathname}`;
}

function getUrlsFromHTML(html, url) {
  const dom = new JSDOM(html);
  const links = dom.window.document.querySelectorAll('a');
  let urls = [];

  for (const link of links) {
    if (link.href.startsWith('/')) {
      try {
        const urlObject = new URL(`${url}${link.href}`);
        urls.push(urlObject.href);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const urlObject = new URL(link.href);
        urls.push(urlObject.href);
      } catch (error) {
        console.log(`${link.href} is ${error.message}`);
      }
    }
  }

  return urls;
}

async function crawlPage(baseUrl, currentUrl, pages) {
  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);
  if (baseUrlObj.hostname !== currentUrlObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentUrl);

  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;

  console.log(`Fetching ${currentUrl}`);

  try {
    const response = await fetch(currentUrl);

    if (response.status > 399) {
      console.log(`Error ${response.status} in ${currentUrl}`);
      return pages;
    }

    const contentType = response.headers.get('content-type');
    if (!contentType.includes('text/html')) {
      console.log(`${url} is not HTML`);
      return pages;
    }

    const responseBody = await response.text();

    const nextUrls = getUrlsFromHTML(responseBody, baseUrl);

    for (const url of nextUrls) {
      pages = await crawlPage(baseUrl, url, pages);
    }
    return pages;
  } catch (error) {
    console.log(error);
  }

  return pages;
}

module.exports = {
  normalizeURL,
  getUrlsFromHTML,
  crawlPage,
};
