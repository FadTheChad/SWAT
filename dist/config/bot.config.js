import { Intents } from "discord.js";
export default {
    version: "1.0.0",
    admins: ["668423998777982997"],
    supportServer: "https://discord.gg/7syTGCkZs8",
    minimalInvite: "https://discord.com/api/oauth2/authorize?client_id=914290270508572692&permissions=292556957910&scope=applications.commands%20bot",
    recommendedInvite: "https://discord.com/api/oauth2/authorize?client_id=914290270508572692&permissions=8&scope=applications.commands%20bot",
    hastebin: "https://h.inv.wtf",
    colors: {
        primary: "5865F2",
        success: "57F287",
        warning: "FEE75C",
        error: "ED4245"
    },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
    requiredPermissions: [
        "EMBED_LINKS",
        "SEND_MESSAGES",
        "USE_EXTERNAL_EMOJIS"
    ],
    apiKeys: {},
    emojis: {
        checkMark: ":white_check_mark:",
        xMark: ":x:"
    }
};