import { scrapeLinkedIn } from './scrapers/linkedin.js';
import { scrapeInternshala } from './scrapers/internshala.js';
import UserSettings from '../models/UserSettings.js';

export const runScrapers = async () => {
    try {
        // Fetch unique keywords and locations from all user settings to optimize scraping
        // (Aggregation could be used here)
        const allSettings = await UserSettings.find({});

        const keywordSet = new Set();
        const locationSet = new Set();

        allSettings.forEach(setting => {
            setting.keywords.forEach(k => keywordSet.add(k));
            setting.locations.forEach(l => locationSet.add(l));
        });

        // Default if no settings
        if (keywordSet.size === 0) keywordSet.add("Software Engineer Intern");
        if (locationSet.size === 0) locationSet.add("India");

        const keywords = Array.from(keywordSet);
        const locations = Array.from(locationSet);

        console.log('Running scrapers for:', keywords, locations);

        let totalSaved = 0;

        // Run sequentially to avoid rate limiting/overload
        for (const keyword of keywords) {
            for (const loc of locations) {
                const result = await scrapeLinkedIn(keyword, loc);
                totalSaved += result?.saved || 0;

                const result2 = await scrapeInternshala(keyword, loc);
                totalSaved += result2?.saved || 0;
            }
        }
        return { success: true, saved: totalSaved };
    } catch (error) {
        console.error('Scraper Service Role:', error);
        return { success: false, error: error.message };
    }
};
