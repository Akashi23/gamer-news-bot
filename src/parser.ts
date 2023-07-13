import { parse } from 'node-html-parser';
import { MiniNews } from './format.js';

export type Parser = {
    url: string,
    download: () => Promise<string>,
    parse: (input: string) => MiniNews,
    getNews: () => Promise<MiniNews[]>,
}

export class IXBTParser implements Parser {
    url: string = 'https://ixbt.games/news';

    async download(): Promise<string> {
        let result: Response = await fetch(this.url);
        return await result.text();
    }

    parse(input: string): MiniNews {
        let root = parse(input);

        const image = root.querySelector('img').getAttribute('src');
        const title = root.querySelector('.card-link').text.trim();
        const url = 'https://ixbt.games' + root.querySelector('.card-link').getAttribute('href');
        let date = root.querySelector('.pubdatetime').text.trim();
        const text = root.querySelector('.my-2').text.trim();

        if (date.length < 6) {
            date = new Date().toLocaleDateString('ru') + ' ' + date;
        }

        return {
            title,
            url,
            date,
            text,
            image,
        }
    }

    async getNews(): Promise<MiniNews[]> {
        const contents = await this.download();
        const root = parse(contents);
        const news = root.querySelectorAll('.no-gutters');

        return news.map((item) => {
            return this.parse(item.innerHTML);
        });
    }
}