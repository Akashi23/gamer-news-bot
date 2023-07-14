import { schedule } from "./cron.js";
import { DeliveryNews } from "./delivery.js";
import { formatNews } from "./format.js";
import { ConsoleLogger, JsonFormat } from "./logger.js";
import { IXBTParser } from "./parser.js"
import { Telegram } from "./telegram.js";

const telegram = new Telegram();
const logger = new ConsoleLogger();

await telegram.start();

telegram.addListener(/\/start/, async (msg) => {
    await telegram.sendMessage(
        'Welcome to the Game News bot!\n' +
        'You are automatically subscribed to news.\n' +
        'You can use the following commands:\n\n' +
        '/subscribe - subscribe to news\n' +
        '/unsubscribe - unsubscribe from news\n', null, msg.chat.id);
});

telegram.addListener(/\/subscribe/, async (msg) => {
    telegram.addChat(msg.chat.id);
    await telegram.sendMessage('Welcome!', null, msg.chat.id);
    logger.log(`User ${msg.chat.id} subscribed`);
});

telegram.addListener(/\/unsubscribe/, async (msg) => {
    await telegram.sendMessage('Bye!', null, msg.chat.id);
    telegram.removeChat(msg.chat.id);
    logger.log(`User ${msg.chat.id} unsubscribed`);
});

const parser = new IXBTParser();
const initNews = await parser.getNews();

const deliveryNews = new DeliveryNews(initNews);

const cronTimeParser = '*/10 * * * *';
const cronTimeDelivery = '*/1 * * * *';

schedule(cronTimeParser, async () => {
    const news = (await parser.getNews()).reverse();
    logger.log(`Got ${news.length} news`);
    news.forEach((item) => {
        deliveryNews.unshift(item);
    });
});

schedule(cronTimeDelivery, async () => {
    const news = deliveryNews.pop();
    logger.log(`Send news ${news?.title}`);
    if (news) {
        await telegram.sendMessage(formatNews(news), news.image);
    }
});