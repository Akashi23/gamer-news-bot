export type MiniNews = {
    title: string,
    url: string,
    date: string,
    text: string,
    image: string,
}


export function formatNews(news: MiniNews) {
    return  `<b>${news.title}</b>\n\n` +
            `${news.text}\n\n` +
            `Дата публикций: ${news.date}\n` +
            `Фулл: ${news.url}`;
}