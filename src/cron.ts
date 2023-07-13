import cron from 'node-cron';

export async function schedule(cronTime: string, callback:  () => Promise<void>): Promise<void> {
    cron.schedule(cronTime, async () => {
        await callback();
    });
}