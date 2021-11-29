import EventHandler from "../../../lib/classes/EventHandler.js";
export default class ShardResume extends EventHandler {
    async run(shardId, replayedEvents) {
        this.client.logger.info(`Shard ${shardId} resumed and replayed ${replayedEvents} events!`);
    }
}
