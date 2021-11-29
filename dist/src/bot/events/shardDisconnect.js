import EventHandler from "../../../lib/classes/EventHandler.js";
export default class ShardDisconnect extends EventHandler {
    async run(event, shardId) {
        this.client.logger.info(`Shard ${shardId} disconnected from the gateway with code ${event.code} and will not reconnect.`);
    }
}
