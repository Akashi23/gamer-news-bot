import TelegramBot from 'node-telegram-bot-api';
import { Bot } from './bot';

export class Telegram implements Bot {
    private bot: TelegramBot;

    private telegramChats: number[] = [];

    async start() {
        this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN || '', { polling: true });
    }

    async sendMessage(message: string, file?: string, chatId?: number) {
        if (!chatId) {
            this.telegramChats.forEach((chat) => {
                this.sendMessage(message, file, chat);
            });
        } else {
            if (file) {
                this.bot.sendPhoto(chatId, file, { caption: message, parse_mode: 'HTML' });
            } else {
                this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
            }
        }
    }
    
    async addListener<RegExp> (
        event: RegExp, 
        callback: (msg: TelegramBot.Message, match: RegExpExecArray) => void
    ) {
        this.bot.onText(event as any, callback);
    };

    addChat(chatId: number) {
        this.telegramChats.push(chatId);
    }

    removeChat(chatId: number) {
        this.telegramChats.splice(this.telegramChats.indexOf(chatId), 1);
    }
}