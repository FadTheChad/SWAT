import {
	ChannelLogsQueryOptions,
	Collection,
	CommandInteraction,
	GuildTextBasedChannel,
	Message,
	Snowflake,
	User
} from "discord.js";
import SlashCommand from "../../../../lib/classes/SlashCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";

export default class Leave extends SlashCommand {
	constructor(client: BetterClient) {
		super("leave", client, {
			description: `Allow the bot to leave a guild.`,
			permissions: [],
			clientPermissions: ["MANAGE_MESSAGES"],
            devOnly: true,
			options: [
				{
					name: "guild",
					type: "STRING",
					description: "The guild to force-leave.",
					required: true
				},
				{
					name: "reason",
					type: "STRING",
					description: "The reason for this forced leave."
				},
				{
					name: "silent",
					type: "BOOLEAN",
					description:
						"If set to true, the bot will send an ephermal message instead of just a normal one."
				},
			]
		});
	}

	override async run(interaction: CommandInteraction) {
        const reason = interaction.options.getString("reason");
        const guildID = interaction.options.getString("guild")
		let guild;
        if(guildID == "-this") {
			guild = interaction.guild;
		} else {
			guild = interaction.client.guilds.cache.get(guildID!);
		}
        if (!guild) {
            interaction.reply("Could not find a guild with that ID.");
            return;
        }
		guild.leave();
		this.client.logger.webhookLog("guild", {
			content: `**__Terminated a Guild (${
				(await this.client.fetchStats()).guilds
			} Total)__**
			\n**Guild Name:** \`${guild.name}\`\n**Guild ID:** \`${
				guild.id
			}\`
			\n**Guild Owner:** <@${guild.ownerId}> \`[${
				guild.ownerId
			}]\`
			\n**Guild Member Count:** \`${
				guild.memberCount || 2
			}\`
			\n**Reason:** ${reason || "No reason provided."}
			\n**Timestamp:** ${this.client.functions.generateTimestamp()}`,
			username: `${this.client.user?.username} | Guild Logs`
		});
		return interaction.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Left Guild",
                    // add a ternary to check if a reason was provided
                    description: `I have left ${guild.name}. Reason: ${reason ? `__${reason}__` : "*no reason provided.*"}.`
				},
				[],
				interaction.options.getBoolean("silent") || false
			)
		);
	}
}
