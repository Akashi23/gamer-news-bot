import { MiniNews } from "./parser.js";

type DeliveryQueue<T> = {
    queue: T[];
    search: (item: T) => number;
    push: (item: T) => void;
    pop: () => T | undefined;
    clear: () => void;
}

export class Delivery implements DeliveryQueue<MiniNews> {
    queue: MiniNews[] = [];

    search(item: MiniNews): number {
        return this.queue.findIndex((element) => {
            return element.url === item.url;
        });
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