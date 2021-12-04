import { load } from "dotenv-extended";
import { ShardingManager } from "discord.js";
import Config from "../config/bot.config.js";
import Logger from "../lib/classes/Logger.js";

load();

const _version = process.env.NODE_ENV === "development" ? `${Config.version}-dev` : Config.version;

let token;
if(process.env.NODE_ENV === "development") {
	token = process.env.DEV_TOKEN;
} else if (process.env.NODE_ENV === "beta") {
	token = process.env.BETA_TOKEN;
} else {
	token = process.env.PROD_TOKEN;	
}

const manager = new ShardingManager("./dist/src/bot/bot.js", {
	token: token,
});

Logger.info(`Starting SWAT. MODE: ${process.env.NODE_ENV}`);

manager.spawn({
	timeout: -1
});

manager.on("shardCreate", (shard) => {
	Logger.info(`Starting Shard ${shard.id}.`);
	if (shard.id + 1 === manager.totalShards) {
		shard.once("ready", () => {
			setTimeout(() => {
				Logger.info("All shards are online and ready!");
			}, 200);
		});
	}
});
