import fs, { link } from "fs"
import path from "path";

type LogLevel = "info" | "error" | "warn";

const LOG_DIR = process.env.LOG_DIR ?? "logs";

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

const getLogFilePath = (): string => {
    const date = new Date().toISOString().split("T")[0];
    return path.join(LOG_DIR, `api_${date}.log`);
}

function timestamp() {
    return new Date().toISOString().replace("T", " ").split(".")[0];
}

const writeJsonToFile = (line: string): void => {
    fs.appendFile(getLogFilePath(), line + "\n", (err) => {
        if (err) console.log("Failed to write log file", err);
    })
}

const writeTextToFile = (level: string, message: string, extra?: unknown): void => {
    const line =
        `${timestamp()} ${level.toUpperCase()} ${message}` +
        (extra ? ` | ${JSON.stringify(extra)}` : "") +
        "\n";

    fs.appendFile(getLogFilePath(), line + "\n", (err) => {
        if (err) console.log("Failed to write log file", err);
    })
}

const baseLog = (level: LogLevel, msg: string, extra?: unknown) => {

    // strandard log format
    writeTextToFile(level, msg, extra);


    // json style logging for structured logging
    const log = {
        level,
        msg,
        time: new Date().toISOString(),
        ...(extra ? { extra } : {})
    };
    const output = JSON.stringify(log);

    // Console for Docker
    if (level === "error") {
        console.error(output);
    } else {
        console.log(output);
    }

    // writeJsonToFile(output);

};

// logger object with three functions
export const logger = {
    info: (msg: string, extra?: unknown) => baseLog("info", msg, extra),
    warn: (msg: string, extra?: unknown) => baseLog("warn", msg, extra),
    error: (msg: string, extra?: unknown) => baseLog("error", msg, extra)
};
