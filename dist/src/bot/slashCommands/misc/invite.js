import { MessageButton, MessageActionRow } from "discord.js";
import SlashCommand from "../../../../lib/classes/SlashCommand.js";
export default class Ping extends SlashCommand {
    constructor(client) {
        super("invite", client, {
            description: `Invite SWAT here.`
        });
    }
    async run(interaction) {
        await interaction.reply(this.client.functions.generateSuccessMessage({
            title: "Invite SWAT",
            description: `Click the button below!`
        }, [
            new MessageActionRow().addComponents(new MessageButton({
                label: "Click Me!",
                url: this.client.config.recommendedInvite,
                style: "LINK"
            }))
        ]));
    }
}
