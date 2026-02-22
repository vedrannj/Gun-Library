const axios = require('axios');
const cheerio = require('cheerio');

const SCRAPE_URLS = [
    'https://en.wikipedia.org/wiki/List_of_firearms',
    'https://en.wikipedia.org/wiki/List_of_assault_rifles',
];

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/**
 * Scrapes a single Wikipedia page for firearm data from wikitables.
 * @param {string} url - The Wikipedia URL to scrape.
 * @returns {Promise<Array>} Parsed items from the page.
 */
async function scrapePage(url) {
    const { data } = await axios.get(url, {
        headers: { 'User-Agent': USER_AGENT },
        timeout: 15000,
    });

    const $ = cheerio.load(data);
    const items = [];

    $('table.wikitable tr').each((_i, row) => {
        const cols = $(row).find('td');
        if (cols.length === 0) return; // Skip header rows

        const name = $(cols[0]).text().trim();
        if (!name) return;

        let imageUrl = null;
        const imgTag = $(row).find('img').first();
        if (imgTag.length > 0) {
            const src = imgTag.attr('src') || '';
            imageUrl = src.startsWith('//') ? 'https:' + src : src;
        }

        items.push({
            id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''),
            name,
            description: cols.length > 1 ? $(cols[1]).text().trim() || 'Military equipment' : 'Military equipment',
            country: cols.length > 2 ? $(cols[2]).text().trim() || 'Unknown' : 'Unknown',
            year: cols.length > 3 ? $(cols[3]).text().trim() || 'N/A' : 'N/A',
            imageUrl,
        });
    });

    return items;
}

/**
 * Main scraper function. Attempts all configured URLs,
 * falls back to seed data if every source fails.
 * @returns {Promise<Array>} The scraped or fallback dataset.
 */
async function scrapeGuns() {
    const allItems = [];

    for (const url of SCRAPE_URLS) {
        try {
            console.log(`Scraping: ${url}`);
            const items = await scrapePage(url);
            console.log(`  -> ${items.length} items found.`);
            allItems.push(...items);
        } catch (err) {
            console.error(`  -> Failed to scrape ${url}: ${err.message}`);
        }
    }

    if (allItems.length > 0) {
        // Deduplicate by id
        const seen = new Set();
        const unique = allItems.filter((item) => {
            if (seen.has(item.id)) return false;
            seen.add(item.id);
            return true;
        });
        console.log(`Scraping complete. ${unique.length} unique items.`);
        return unique;
    }

    console.warn('All scrapers failed. Using fallback seed data.');
    return getSeedData();
}

/**
 * Reliable seed data so the frontend always has something to show.
 */
function getSeedData() {
    return [
        {
            id: 'm4-carbine',
            name: 'M4 Carbine',
            description: 'A 5.56×45mm NATO, gas-operated, magazine-fed carbine developed in the United States.',
            country: 'United States',
            year: '1994',
            imageUrl: null,
        },
        {
            id: 'ak-47',
            name: 'AK-47',
            description: 'A gas-operated, 7.62×39mm assault rifle developed in the Soviet Union by Mikhail Kalashnikov.',
            country: 'Soviet Union',
            year: '1949',
            imageUrl: null,
        },
        {
            id: 'fn-scar',
            name: 'FN SCAR',
            description: 'A family of gas-operated automatic rifles developed by Belgian manufacturer FN Herstal.',
            country: 'Belgium',
            year: '2009',
            imageUrl: null,
        },
        {
            id: 'hk416',
            name: 'HK416',
            description: 'An assault rifle designed and manufactured by Heckler & Koch, using a short-stroke gas piston system.',
            country: 'Germany',
            year: '2004',
            imageUrl: null,
        },
        {
            id: 'sa80',
            name: 'SA80 (L85)',
            description: 'A British family of 5.56×45mm NATO small arms, the standard issue rifle of the British Armed Forces.',
            country: 'United Kingdom',
            year: '1985',
            imageUrl: null,
        },
    ];
}

module.exports = { scrapeGuns };
