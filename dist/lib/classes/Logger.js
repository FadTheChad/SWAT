import { bgGreenBright, bgMagentaBright, bgRedBright, bgYellowBright, blackBright, bold } from "colorette";
import { format } from "util";
import init from "../utilities/sentry.js";
import { WebhookClient } from "discord.js";
export class Logger {
    constructor() {
        this.sentry = init();
        this.webhooks = {};
    }
    get timestamp() {
        const now = new Date();
        const [year, month, day] = now.toISOString().substr(0, 10).split("-");
        return `${day}/${month}/${year} @ ${now.toISOString().substr(11, 8)}`;
    }
    debug(...args) {
        console.log(bold(bgMagentaBright(`[${this.timestamp}]`)), bold(format(...args)));
    }
    info(...args) {
        console.log(bold(bgGreenBright(blackBright(`[${this.timestamp}]`))), bold(format(...args)));
    }
    warn(...args) {
        console.log(bold(bgYellowBright(blackBright(`[${this.timestamp}]`))), bold(format(...args)));
    }
    error(error, ...args) {
        console.log(bold(bgRedBright(`[${this.timestamp}]`)), error, bold(format(...args)));
    }
    async webhookLog(type, options) {
        if (!type)
            throw new Error("No webhook type provided!");
        else if (!this.webhooks[type.toLowerCase()]) {
            const webhookURL = process.env[`${type.toUpperCase()}_HOOK`];
            if (!webhookURL)
                throw new Error(`Invalid webhook type provided!`);
            this.webhooks[type.toLowerCase()] = new WebhookClient({
                url: process.env[`${type.toUpperCase()}_HOOK`]
            });
        }
        return this.webhooks[type.toLowerCase()].send(options);
    }
}
export default new Logger();
