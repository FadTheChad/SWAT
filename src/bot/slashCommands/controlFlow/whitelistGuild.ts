import {
	ChannelLogsQueryOptions,
	Collection,
	CommandInteraction,
	GuildTextBasedChannel,
	Message,
	Snowflake,
	User
} from "discord.js";
import SlashCommand from "../../../../lib/classes/SlashCommand.js";
import BetterClient from "../../../../lib/extensions/BetterClient.js";

export default class whitelistGuild extends SlashCommand {
	constructor(client: BetterClient) {
		super("whitelistguild", client, {
			description: `Whitelist a guild to use SWAT.`,
			permissions: [],
			clientPermissions: ["MANAGE_MESSAGES"],
            devOnly: true,
			options: [
				{
					name: "guild",
					type: "STRING",
					description: "The guild to whitelist.",
					required: true
				},
				{
					name: "reason",
					type: "STRING",
					description: "The reason for this whitelist."
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
		
        const guild = interaction.client.guilds.cache.get(guildID!);
        if (!guild) {
            interaction.reply("Could not find a guild with that ID.");
            return;
        }
        // TODO: update mongodb the 'allowed_guilds' collection with the new guild
		return interaction.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Guide Whitelist",
                    description: `${guild.name} | [${guild.id}] is now authorized to use SWAT. Reason: ${reason ? `__${reason}__` : "*no reason provided.*"}.`
				},
				[],
				interaction.options.getBoolean("silent") || false
			)
		);
	}
}
