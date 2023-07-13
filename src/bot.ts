export type Bot = {
    start: () => Promise<void>;
    sendMessage: (message: string, file?: string, ...args: any) => Promise<void>;
    addListener: <T>(event: T, callback: () => void) => void;
}
