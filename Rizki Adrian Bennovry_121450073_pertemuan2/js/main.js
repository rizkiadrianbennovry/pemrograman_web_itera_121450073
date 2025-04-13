import { GoalTracker } from './GoalTracker.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const tracker = new GoalTracker();
        await tracker.init();
    } catch (error) {
        console.error('Failed to initialize:', error);
    }
});