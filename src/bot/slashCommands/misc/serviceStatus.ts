import {
	ChannelLogsQueryOptions,
	Collection,
	CommandInteraction,
	GuildTextBasedChannel,
	Message,
	Snowflake,
	User,
    MessageEmbed
} from "discord.js";
import SlashCommand from "../../../../lib/classes/SlashCommand.js";
import BetterClient from "../../../../lib/extensions/BetterClient.js";


export default class serviceStatus extends SlashCommand {
	constructor(client: BetterClient) {
		super("servicestatus", client, {
			description: `Check server status of SWAT.`,
			permissions: [],
			clientPermissions: [],
			options: [
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

		let getStringStatus = ['DISCONNECTED', 'CONNECTED', 'CONNECTING', 'DISCONNECTING']
        let dbCon = getStringStatus[this.client.mongoStatus]!;


		let embed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("SWAT Service Status")
            .setDescription(`
            Below you can see the service status of each module of SWAT.
            `)
            .addField("Database", dbCon, true)
			// add shard info
			.addField("Shards Live", `${this.client!.shard!.ids}/${this.client!.shard!.count}`, true)
            
            .setFooter("Report Issues => /support");
        interaction.reply({ embeds: [embed] });
	}
}