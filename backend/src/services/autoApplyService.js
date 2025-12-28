import puppeteer from 'puppeteer';
import Job from '../models/Job.js';
import ApplicationLog from '../models/ApplicationLog.js';
// import { generateCoverLetter } from './aiService.js';

export const runAutoApply = async (userId) => {
    console.log('Starting Auto-Apply Engine...');
    // Logic: Fetch unapplied matched jobs, loop through them, open URL, fill form.
    // This is highly complex and site-specific. We will implement a basic skeleton.

    const jobs = await Job.find({ applied: false, matched: false, status: { $ne: 'failed' } }).limit(5); // Process 5 at a time

    if (jobs.length === 0) {
        console.log('No jobs to apply to.');
        return;
    }

    const browser = await puppeteer.launch({ headless: false }); // Headless false for debugging
    const page = await browser.newPage();

    for (const job of jobs) {
        try {
            console.log(`Applying to: ${job.title} at ${job.company}`);

            // 1. Go to URL
            await page.goto(job.applyUrl, { waitUntil: 'networkidle2' });

            // 2. Mock filling form (Real implementation requires complex selectors)
            // await page.type('input[name="name"]', 'DeepMind User');
            // await page.type('input[name="email"]', 'user@example.com');

            // 3. Submit
            // await page.click('button[type="submit"]');

            // 4. Update DB
            job.applied = true;
            job.status = 'applied';
            await job.save();

            await ApplicationLog.create({
                userId,
                jobId: job._id,
                jobTitle: job.title,
                company: job.company,
                status: 'success',
                message: 'Auto-applied (Simulation)'
            });

        } catch (error) {
            console.error(`Failed to apply to ${job.title}:`, error);

            job.status = 'failed'; // Mark as failed to avoid infinite loop
            await job.save();

            await ApplicationLog.create({
                userId,
                jobId: job._id,
                jobTitle: job.title,
                company: job.company,
                status: 'failed',
                message: error.message
            });
        }
    }

    await browser.close();
    console.log('Auto-Apply Run Complete');
};
