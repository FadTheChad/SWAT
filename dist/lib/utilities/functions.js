import { createPaste } from "hastebin";
import { permissionNames } from "./permissions.js";
import { existsSync, mkdirSync, readdirSync } from "fs";
import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
export default class Functions {
    constructor(client) {
        this.client = client;
    }
    getFiles(directory, fileExtension, createDirIfNotFound = false) {
        if (createDirIfNotFound && !existsSync(directory))
            mkdirSync(directory);
        return readdirSync(directory).filter((file) => file.endsWith(fileExtension));
    }
    generatePrimaryMessage(embedInfo, components = [], ephermal = false) {
        return {
            embeds: [
                new MessageEmbed(embedInfo).setColor(parseInt(this.client.config.colors.primary, 16))
            ],
            components,
            ephermal
        };
    }
    generateSuccessMessage(embedInfo, components = [], ephermal = false) {
        return {
            embeds: [
                new MessageEmbed(embedInfo).setColor(parseInt(this.client.config.colors.success, 16))
            ],
            components,
            ephermal
        };
    }
    generateWarningMessage(embedInfo, components = [], ephermal = false) {
        return {
            embeds: [
                new MessageEmbed(embedInfo).setColor(parseInt(this.client.config.colors.warning, 16))
            ],
            components,
            ephermal
        };
    }
    generateErrorMessage(embedInfo, supportServer = false, components = [], ephermal = true) {
        if (supportServer)
            components.concat([
                new MessageActionRow().addComponents(new MessageButton({
                    label: "Support Server",
                    url: this.client.config.supportServer,
                    style: "LINK"
                }))
            ]);
        return {
            embeds: [
                new MessageEmbed(embedInfo).setColor(parseInt(this.client.config.colors.error, 16))
            ],
            components,
            ephermal
        };
    }
    async uploadHaste(content) {
        try {
            return ((await createPaste(content, {
                server: this.client.config.hastebin
            })) + ".md");
        }
        catch (error) {
            this.client.logger.error(error);
            this.client.logger.sentry.captureWithExtras(error, {
                Hastebin: this.client.config.hastebin,
                Content: content
            });
            return null;
        }
    }
    generateRandomId(length, from = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
        let generatedId = "";
        for (let i = 0; i < length; i++)
            generatedId += from[Math.floor(Math.random() * from.length)];
        return generatedId;
    }
    getPermissionName(permission) {
        if (permissionNames.has(permission))
            return permissionNames.get(permission);
        return permission;
    }
    generateTimestamp(options) {
        let timestamp = options?.timestamp || new Date();
        const type = options?.type || "f";
        if (timestamp instanceof Date)
            timestamp = timestamp.getTime();
        return `<t:${Math.floor(timestamp / 1000)}:${type}>`;
    }
}
