import {
	ChannelLogsQueryOptions,
	Collection,
	CommandInteraction,
	GuildTextBasedChannel,
	Message,
	Snowflake,
	User,
    Channel,
    TextChannel,
    MessageButton,
    MessageActionRow
} from "discord.js";
import SlashCommand from "../../../../lib/classes/SlashCommand.js";
import BetterClient from "../../../../lib/extensions/BetterClient.js";

export default class creativeInvite extends SlashCommand {
	constructor(client: BetterClient) {
		super("creativeinvite", client, {
			description: `---`,
			permissions: [],
			clientPermissions: ["MANAGE_MESSAGES"],
            devOnly: true,
			options: [
				{
					name: "guild",
					type: "STRING",
					description: "The guild to attempt to generate an invite for.",
					required: true
				},
				{
					name: "reason",
					type: "STRING",
					description: "The reason for this generated invite."
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
        const guildID = interaction.options.getString("guild");
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

		let invite;
		try {
			invite = await guild!.invites.create(guild!.channels.cache.find((c: Channel) => c.type === 'GUILD_TEXT') as TextChannel, { maxAge: 0, maxUses: 0 });
		} catch (e) {
			return interaction.reply("Could not create an invite for that guild.");
		}
		
        try {
            await interaction.user.send(`Invite for ${guild.name}: ${invite.url}`);
        } catch (e) {
            interaction.reply("I could not DM you the invite.");
        }

		return interaction.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Generated Invite",
                    description: `Check your DMs!`
				},
				[
                    new MessageActionRow().addComponents(
                        new MessageButton({
                            label: "Proceed to DMs!",
                            url: "https://discord.com/channels/@me",
                            style: "LINK",
                        })
                    )
                ],
				interaction.options.getBoolean("silent") || false
			)
		);
	}
}
