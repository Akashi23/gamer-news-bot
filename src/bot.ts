type Bot = {
    start: () => Promise<void>;
    sendMessage: (message: string, file?: string, ...args: any) => Promise<void>;
    addListener: (event: string, callback: () => void) => void;
}

type Chat<T> = {
    id: T;
    type?: string;
}