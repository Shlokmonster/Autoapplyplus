import cron from 'node-cron';

// Mock cron job for now
cron.schedule('0 */2 * * *', () => {
    console.log('Running Scraper and Auto-Apply (Cron)');
    // runScrapers();
    // runAutoApply();
});
