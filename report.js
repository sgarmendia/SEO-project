function sortPages(pages) {
  const pagesArray = Object.entries(pages);
  pagesArray.sort((a, b) => {
    return b[1] - a[1];
  });
  return pagesArray;
}

function printReport(pages) {
  console.log(`\x1b[1m\x1b[32m
========================
        REPORT
========================
\x1b[0m`);

  const sortedPages = sortPages(pages);

  for (const page of sortedPages) {
    const url = page[0];
    const hits = page[1];

    console.log(`${hits} --- ${url}`);
  }

  console.log(`\x1b[1m\x1b[32m
========================
      END REPORT
========================
\x1b[0m`);
}

module.exports = { sortPages, printReport };
