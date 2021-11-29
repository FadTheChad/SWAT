export default class EventHandler {
    constructor(client, name) {
        this.name = name;
        this.client = client;
        this._listener = this._run.bind(this);
    }
    async _run(...args) {
        try {
            return this.run(...args);
        }
        catch (error) {
            this.client.logger.error(error);
            this.client.logger.sentry.captureWithExtras(error, {
                Event: this.name,
                Arguments: args
            });
        }
    }
    async run(...args) { }
    listen() {
        return this.client.on(this.name, this._listener);
    }
    removeListener() {
        return this.client.off(this.name, this._listener);
    }
}
