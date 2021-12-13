import { Snowflake } from 'discord.js';
import GuildSchema from '../../models/Guild';

const getConfig = async (guildId: Snowflake) => {
    let config = (await GuildSchema.findOne({ id: guildId }))?.config ?? {} // is ?? = null?

    return config // i have no idea if this will work but should // lets see what it does when building // wait
}
