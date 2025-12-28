import puppeteer from 'puppeteer';
import Job from '../../models/Job.js';

export const scrapeLinkedIn = async (keywords, location) => {
    console.log(`Starting LinkedIn Scrape for ${keywords} in ${location}`);
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Construct search URL
    // Example: https://www.linkedin.com/jobs/search?keywords=Software%20Engineer&location=India
    const url = `https://www.linkedin.com/jobs/search?keywords=${encodeURIComponent(keywords)}&location=${encodeURIComponent(location)}`;

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Auto-scroll to load more jobs
        await autoScroll(page);

        const jobs = await page.evaluate(() => {
            const jobCards = document.querySelectorAll('.base-card');
            const scrapedJobs = [];

            jobCards.forEach(card => {
                const title = card.querySelector('.base-search-card__title')?.innerText.trim();
                const company = card.querySelector('.base-search-card__subtitle')?.innerText.trim();
                const location = card.querySelector('.job-search-card__location')?.innerText.trim();
                const applyUrl = card.querySelector('a.base-card__full-link')?.href;

                if (title && applyUrl) {
                    scrapedJobs.push({
                        title,
                        company,
                        location,
                        applyUrl,
                        source: 'LinkedIn',
                        description: 'Description not available in summary view'
                    });
                }
            });
            return scrapedJobs;
        });

        console.log(`Scraped ${jobs.length} jobs from LinkedIn`);

        let savedCount = 0;
        for (const job of jobs) {
            const exists = await Job.findOne({ applyUrl: job.applyUrl });
            if (!exists) {
                await Job.create(job);
                savedCount++;
            }
        }
        console.log(`Saved ${savedCount} new jobs`);
        return { found: jobs.length, saved: savedCount };

    } catch (error) {
        console.error('Error scraping LinkedIn:', error);
        return { found: 0, saved: 0, error: error.message };
    } finally {
        await browser.close();
    }
};

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight || totalHeight > 5000) { // limit scroll
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
