import { Guild } from "discord.js";
import EventHandler from "../../../lib/classes/EventHandler";

export default class GuildCreate extends EventHandler {
	override async run(guild: Guild) {
		try {
			guild.commands.set(
				this.client.slashCommands.map((command) => {
					return {
						name: command.name,
						description: command.description,
						options: command.options
					};
				})
			);
		} catch (error: any) {
			if (error.code === 50001)
				this.client.logger.debug(
					`I encountered DiscordAPIError: Missing Access in ${guild.name} [${guild.id}] when trying to set slash commands!`
				);
			else {
				this.client.logger.error(error);
				this.client.logger.sentry.captureWithExtras(error, {
					guild: guild
				});
			}
		}
		this.client.logger.info(
			`Joined guild ${guild.name} (${guild.id}) with ${guild.memberCount} members, now in ${
				(await this.client.fetchStats()).guilds
			} guilds(s)!`
		);
		
		const ownerId = guild.ownerId;
		const owner = await this.client.users.fetch(ownerId);
		await owner.send(`Thank you for adding me to your server!\n\n` + `You can find my documentation at https://docs.discord.js.org/` + `\n\n` + `If you have any questions, feel free to join the support server at https://discord.gg/2zQfqyU`)
		this.client.GuildSchema.create({
			_id: guild.id,
			name: guild.name,
			ownerId: guild.ownerId,
		}).catch(err => {
			this.client.logger.error(err);
			this.client.logger.sentry.captureWithExtras(err, {
				guild: guild
			});
		});
		return this.client.logger.webhookLog("guild", {
			content: `**__Joined a New Guild (${
				(await this.client.fetchStats()).guilds
			} Total)__**\n**Guild Name:** \`${guild.name}\`\n**Guild ID:** \`${
				guild.id
			}\`\n**Guild Owner:** <@${guild.ownerId}> \`[${
				guild.ownerId
			}]\`\n**Guild Member Count:** \`${
				guild.memberCount || 2
			}\`\n**Timestamp:** ${this.client.functions.generateTimestamp()}`,
			username: `${this.client.user?.username} | Guild Logs`
		});
	}
}
