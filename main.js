const { crawlPage } = require('./crawl');
const { printReport } = require('./report');

async function main() {
  if (process.argv.length < 3) {
    console.log('no website provided');
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log('too many arguments');
    process.exit(1);
  }

  const url = process.argv[2];
  // Log text in bright colors with css
  console.log(
    `\x1b[1m\x1b[32m
   ---- Crawling ${url} ---- 
    \x1b[0m`
  );

  const pages = await crawlPage(url, url, {});

  //   for (const page in pages) {
  //     if (Object.hasOwnProperty.call(pages, page)) {
  //       const element = pages[page];
  //       console.log(element);
  //     }
  //   }
  // console.log(pages);

  printReport(pages);
}

main();
