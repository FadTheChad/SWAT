import GuildSchema from '../../models/Guild'
import { Snowflake } from 'discord.js'
import { Document } from 'mongoose'
import { BeAnObject, IObjectWithTypegooseFunction } from '@typegoose/typegoose/lib/types'

export const setModLogs = async (guildId: Snowflake, modLogsID: Snowflake) => {
    let data = await GuildSchema.findOne({ id: guildId })

    if (data) {
        data.config!.modlogsChannel = modLogsID

        await data.save()
        console.log(data)
    } else {
        data = new GuildSchema ({
            id: guildId,
            config: {
                modlogsChannel: modLogsID
            }
        })
        await data.save()
    }
}

export const getModLogs = async (guildId: Snowflake) => {
    const result = await GuildSchema.findOne({ id: guildId})

    return result?.config?.modlogsChannel
}