import { Snowflake } from 'discord.js';
import GuildSchema from '../../models/Guild';

const getConfig = async (guildId: Snowflake) => {
    let config = (await GuildSchema.findOne({ id: guildId }))?.config ?? {} // is ?? = null?

    return config
}
