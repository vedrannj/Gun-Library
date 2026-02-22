const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { scrapeGuns } = require('./scraper/scraper');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'database.json');

// Initialize database file if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
}

/**
 * Reads and parses the JSON database file.
 * @returns {Array} The parsed array of weapon objects.
 */
function readDB() {
    try {
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    } catch {
        return [];
    }
}

/**
 * Runs the scraper and writes results to the database file.
 */
async function runScraper() {
    console.log('[Scraper] Starting scheduled scrape...');
    try {
        const data = await scrapeGuns();
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
        console.log(`[Scraper] Done. Saved ${data.length} items.`);
    } catch (err) {
        console.error('[Scraper] Fatal error:', err.message);
    }
}

// --- Routes ---

// GET /api/search?q=<query>  — search or list all
app.get('/api/search', (_req, res) => {
    const query = _req.query.q?.toLowerCase()?.trim();
    const db = readDB();

    if (!query) {
        return res.json(db.slice(0, 50));
    }

    const results = db.filter(
        (item) =>
            item.name.toLowerCase().includes(query) ||
            (item.country && item.country.toLowerCase().includes(query)) ||
            (item.description && item.description.toLowerCase().includes(query))
    );

    res.json(results);
});

// POST /api/scrape  — manually trigger a scrape (dev/testing only)
app.post('/api/scrape', async (_req, res) => {
    try {
        await runScraper();
        res.json({ message: 'Scraping successful', count: readDB().length });
    } catch {
        res.status(500).json({ error: 'Scraping failed' });
    }
});

// GET /api/health  — simple health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', items: readDB().length });
});

// Schedule scraper to run daily at midnight
cron.schedule('0 0 * * *', runScraper);

// Populate database on first launch if empty
const initialDB = readDB();
if (initialDB.length === 0) {
    runScraper();
}

app.listen(PORT, () => {
    console.log(`[Server] Running on http://localhost:${PORT}`);
});
