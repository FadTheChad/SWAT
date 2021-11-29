import SlashCommand from "../../../../lib/classes/SlashCommand.js";
export default class Ping extends SlashCommand {
    constructor(client) {
        super("ping", client, {
            description: `Pong! Get the current ping / latency of SWAT.`
        });
    }
    async run(interaction) {
        const message = (await interaction.reply({
            content: "Pinging... please hold.",
            fetchReply: true
        }));
        const hostLatency = message.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = Math.round(this.client.ws.ping);
        return interaction.editReply({
            content: `Pong! Round trip took ${(hostLatency + apiLatency).toLocaleString()}ms. (Host latency is ${hostLatency.toLocaleString()} and API latency is ${apiLatency.toLocaleString()}ms)`
        });
    }
}
