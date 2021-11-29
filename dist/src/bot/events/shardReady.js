import EventHandler from "../../../lib/classes/EventHandler.js";
export default class ShardReady extends EventHandler {
    async run(shardId, unavailableGuilds) {
        this.client.logger.info(`Shard ${shardId} online in ${this.client.guilds.cache.size} servers with ${unavailableGuilds?.size || 0} unavailable guilds.`);
        this.client.logger.webhookLog("console", {
            content: `${this.client.functions.generateTimestamp()} Shard ${shardId} online in ${this.client.guilds.cache.size} servers with ${unavailableGuilds?.size || 0} unavailable guilds.`
        });
    }
}
