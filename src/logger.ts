type Options = Record<string, string | number>;

type LoggerFormat = {
    format: (text: string, options: Options) => string;
};

type Logger = {
    pid: number;
    format: LoggerFormat;

    log: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
};

export class ConsoleLogger implements Logger {
    pid: number;
    format: LoggerFormat;

    constructor(format: LoggerFormat = new ConsoleFormat()) {
        this.pid = process.pid;
        this.format = format;
    }

    log(message: string) {
        const formattedMessage = this.format.format(
            message, {
            pid: this.pid,
            time: new Date().toLocaleTimeString(),
            type: 'LOG'
        });


        console.log(formattedMessage);
    }
    error(message: string) {
        const formattedMessage = this.format.format(
            message, {
            pid: this.pid,
            time: new Date().toLocaleTimeString(),
            type: 'ERROR'
        });
            
        console.log(formattedMessage);
    }
    warning(message: string) {
        const formattedMessage = this.format.format(
            message, {
            pid: this.pid,
            time: new Date().toLocaleTimeString(),
            type: 'WARNING'
        });

        console.log(formattedMessage);
    }
}

export class ConsoleFormat implements LoggerFormat {
    format(text: string, options: Options) {
        const metadata = Object.keys(options).map((key) =>  `${key}: ${options[key]}`);
        return `${metadata.join(' | ')} ${text}`;
    }
}

export class JsonFormat implements LoggerFormat {
    format(text: string, options: Options) {
        return JSON.stringify({ ...options, text });
    }
}