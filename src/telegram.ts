import TelegramBot from 'node-telegram-bot-api';

const telegramChats: Chat<number>[] = [];

export class Telegram implements Bot {
    private bot: TelegramBot;

    async start() {
        this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN || '', { polling: true });
    }

    async sendMessage(message: string, file?: string, chatId?: number) {
        if (!chatId) {
            telegramChats.forEach((chat) => {
                this.sendMessage(message, file, chat.id);
            });
        } else {
            if (file) {
                this.bot.sendPhoto(chatId, file, { caption: message });
            } else {
                this.bot.sendMessage(chatId, message);
            }
        }
    }
    
    addListener: (event: string, callback: () => void) => void;
}