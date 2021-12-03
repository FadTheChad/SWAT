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


export default class lockdownBot extends SlashCommand {
	constructor(client: BetterClient) {
		super("lockdownbot", client, {
			description: `Lockdown the bot.`,
			permissions: [],
			clientPermissions: [],
            devOnly: true,
			options: [
				{
					name: "announce",
					type: "BOOLEAN",
					description: "Announce this lockdown or not?",
					required: true
				},
				{
					name: "reason",
					type: "STRING",
					description: "The reason for lockdown."
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
        const announce = interaction.options.getBoolean("announce");

		// this.client.functions.updateConfig();

        if(announce === true) {
            this.client.logger.webhookLog("announcement", {
                content: `**__Bot Locked Down__**\n\n
                \n**Reason:** ${reason || "No reason provided."}
                \n**Timestamp:** ${this.client.functions.generateTimestamp()}
                \n**Admin that initiated the lockdown:** <@${interaction.user.id}> (${interaction.user.id})
                \n**Info:** More info will be provided when available. Hang tight!`,
                username: `${this.client.user?.username} | Announcements`
            });
        }
		return interaction.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Bot successfully entered lockdown mode.",
                    description: `${announce ? `Message posted in bot announcements` : "*message has NOT been posted, please manually clarify.*"} Reason: ${reason ? `__${reason}__` : "*no reason provided.*"}.`
				},
				[],
				interaction.options.getBoolean("silent") || false

            
			)
		);
	}
}
