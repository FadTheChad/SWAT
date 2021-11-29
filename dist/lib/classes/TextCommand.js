export default class TextCommand {
    constructor(name, client, options) {
        this.name = name;
        this.description = "";
        this.aliases = options.aliases || [];
        this.permissions = options.permissions || [];
        this.clientPermissions = client.config.requiredPermissions.concat(options.clientPermissions || []);
        this.devOnly = options.devOnly || false;
        this.guildOnly = options.guildOnly || false;
        this.ownerOnly = options.ownerOnly || false;
        this.client = client;
    }
    validate(message) {
        if (this.guildOnly && !message.inGuild())
            return "This command can only be used in guilds.";
        else if (this.ownerOnly && message.guild?.ownerId !== message.author.id)
            return "This command can only be ran by the owner of this guild!";
        else if (this.devOnly && !this.client.config.admins.includes(message.author.id))
            return "This command can only be used by the bot developer.";
        else if (this.permissions.length > 0 && !message.member?.permissions.has(this.permissions))
            return `You need ${this.permissions.length > 1 ? "" : "the"} ${this.permissions
                .map((permission) => `**${this.client.functions.getPermissionName(permission)}**`)
                .join(", ")} permission${this.permissions.length > 1 ? "s" : ""} to run this command.`;
        if (this.clientPermissions.length > 0 &&
            !message.guild?.me?.permissions.has(this.clientPermissions))
            return `You need ${this.permissions.length > 1 ? "" : "the"} ${this.permissions
                .map((permission) => `**${this.client.functions.getPermissionName(permission)}**`)
                .join(", ")} permission${this.permissions.length > 1 ? "s" : ""} to run this command.`;
        return null;
    }
    async run(message, args) { }
}
