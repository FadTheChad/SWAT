export default class DropDown {
    constructor(name, client, options) {
        this.name = name;
        this.permissions = options.permissions || [];
        this.clientPermissions = client.config.requiredPermissions.concat(options.clientPermissions || []);
        this.devOnly = options.devOnly || false;
        this.guildOnly = options.guildOnly || false;
        this.ownerOnly = options.ownerOnly || false;
        this.client = client;
    }
    validate(interaction) {
        if (this.guildOnly && !interaction.inGuild())
            return "This drop down can only be used in guilds!";
        else if (this.ownerOnly && interaction.guild?.ownerId !== interaction.user.id)
            return "This drop down can only be ran by the owner of this guild!";
        else if (this.devOnly && !this.client.config.admins.includes(interaction.user.id))
            return "This drop down can only be ran by my developer!";
        else if (this.permissions && !interaction.memberPermissions?.has(this.permissions))
            return `You need ${this.permissions.length > 1 ? "" : "the"} ${this.permissions
                .map((permission) => `**${this.client.functions.getPermissionName(permission)}**`)
                .join(", ")} permission${this.permissions.length > 1 ? "s" : ""} to run this drop down.`;
        else if (this.clientPermissions &&
            !interaction.memberPermissions?.has(this.clientPermissions))
            return `You need ${this.permissions.length > 1 ? "" : "the"} ${this.permissions
                .map((permission) => `**${this.client.functions.getPermissionName(permission)}**`)
                .join(", ")} permission${this.permissions.length > 1 ? "s" : ""} to run this drop down.`;
        return null;
    }
    async run(interaction) { }
}
