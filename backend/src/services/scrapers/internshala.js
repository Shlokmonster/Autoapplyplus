import puppeteer from 'puppeteer';
import Job from '../../models/Job.js';

export const scrapeInternshala = async (keywords, location) => {
    console.log(`Starting Internshala Scrape for ${keywords} in ${location}`);
    // Note: Internshala search URL structure is different. 
    // Example: https://internshala.com/internships/software-development-internship-in-bangalore/
    // We will do a generic generic search or construct URL logic.
    // Simplifying for keyword matching on main page or custom search

    // Fallback URL construction
    const k = keywords.replace(/\s+/g, '-').toLowerCase();
    const l = location.replace(/\s+/g, '-').toLowerCase();
    const url = `https://internshala.com/internships/${k}-internship-in-${l}/`;

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Set user agent to avoid bot detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Wait for container
        try {
            await page.waitForSelector('.internship_meta', { timeout: 10000 });
        } catch (e) {
            console.log('Internshala selector not found or no jobs.');
            return { found: 0, saved: 0 };
        }

        const jobs = await page.evaluate(() => {
            const cards = document.querySelectorAll('.internship_meta');
            const data = [];
            cards.forEach(card => {
                const title = card.querySelector('.profile')?.innerText.trim();
                const company = card.querySelector('.company_name')?.innerText.trim();
                const location = card.querySelector('.location_link')?.innerText.trim();
                const applyUrlLink = card.querySelector('.view_detail_button')?.href;
                // applyUrl is often an absolute or relative path

                if (title && applyUrlLink) {
                    data.push({
                        title,
                        company,
                        location,
                        applyUrl: applyUrlLink,
                        source: 'Internshala',
                        description: 'Check detail page'
                    });
                }
            });
            return data;
        });

        console.log(`Scraped ${jobs.length} jobs from Internshala`);

        let savedCount = 0;
        for (const job of jobs) {
            // Need a fully qualified URL if scraped as relative
            if (job.applyUrl && !job.applyUrl.startsWith('http')) {
                job.applyUrl = 'https://internshala.com' + job.applyUrl;
            }

            const exists = await Job.findOne({ applyUrl: job.applyUrl });
            if (!exists) {
                await Job.create(job);
                savedCount++;
            }
        }
        return { found: jobs.length, saved: savedCount };

    } catch (error) {
        console.error('Internshala Scrape Error:', error);
        return { found: 0, saved: 0, error: error.message };
    } finally {
        await browser.close();
    }
};
