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

export default class setStatus extends SlashCommand {
	constructor(client: BetterClient) {
		super("setstatus", client, {
			description: `Change the bot's status.`,
			permissions: [],
			clientPermissions: ["MANAGE_MESSAGES"],
            devOnly: true,
			options: [
				{
					name: "status",
					type: "STRING",
					description: "The status to set.",
					required: true
				},
				{
					name: "reason",
					type: "STRING",
					description: "The reason for this status change."
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
        const status = interaction.options.getString("status")
		// set bots status
        this.client?.user?.setPresence({
            status: "online",
            activities: [
                {
                    type: "WATCHING",
                    name: status!
                }
            ],
        });
		return interaction.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Set Status",
                    description: `Status set to: ${status}. Reason: ${reason ? `__${reason}__` : "*no reason provided.*"}.`
				},
				[],
				interaction.options.getBoolean("silent") || false
			)
		);
	}
}
