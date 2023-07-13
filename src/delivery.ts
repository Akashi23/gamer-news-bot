import { MiniNews } from "./format.js";

type DeliveryQueue<T> = {
    queue: T[];
    search: (item: T) => number;
    push: (item: T) => void;
    pop: () => T | undefined;
    clear: () => void;
}

export class DeliveryNews implements DeliveryQueue<MiniNews> {
    queue: MiniNews[] = [];

    constructor(news: MiniNews[]) {
        this.queue = news;
    }

    search(item: MiniNews): number {
        return this.queue.findIndex((element) => {
            return element.url === item.url;
        });
    }

    unshift(item: MiniNews) {
        if (this.search(item) !== -1) {
            this.queue.unshift(item);
        }
    }

    shift(): MiniNews | undefined {
        return this.queue.shift();
    }

    push(item: MiniNews) {
        if (this.search(item) !== -1) {
            this.queue.push(item);
        }
    }

    pop(): MiniNews | undefined {
        return this.queue.pop();
    }

    clear() {
        this.queue = [];
    }
}