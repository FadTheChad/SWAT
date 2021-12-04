import { Snowflake } from "discord.js";
import EventHandler from "../../../lib/classes/EventHandler.js";

export default class ShardReady extends EventHandler {
	override async run(shardId: number, unavailableGuilds: Set<Snowflake>) {
		this.client.logger.info(
			`${this.client!.user!.username} || Shard ${shardId} online in ${this.client.guilds.cache.size} servers with ${
				unavailableGuilds?.size || 0
			} unavailable guilds.`
		);
		this.client.logger.webhookLog("console", {
			content: `${this.client!.user!.username} || ${this.client.functions.generateTimestamp()} Shard ${shardId} online in ${this.client.guilds.cache.size} servers with ${
				unavailableGuilds?.size || 0
			} unavailable guilds.`
		});
	}
}
