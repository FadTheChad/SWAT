import { Snowflake } from 'discord.js'

// This da interface for the Schema so add things here aswell to get moist typings

export default interface IGuild {
    _id: string,
    blacklisted: boolean,
    whitelisted?: boolean, // isnt blacklisted bool opposite of whitelist
    automodExcludedRole: Snowflake // doesn't get affected with automod,
    blacklistedWords: string[] // if needed
}