import EventHandler from "../../../lib/classes/EventHandler.js";
export default class ShardReconnecting extends EventHandler {
    async run(shardId) {
        this.client.logger.info(`Shard ${shardId} is reconnecting to the gateway!`);
    }
}
