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
        // convert the id to a guild we can leave
        const guild = this.client.guilds.cache.get(guildID!);
        if (!guild) {
            interaction.reply("Could not find a guild with that ID.");
            return;
        }
		guild.leave();
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
