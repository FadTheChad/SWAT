import { Schema, model, Model } from 'mongoose' // typegoose would be sicker
import IGuild from './interfaces/IGuild'

// _id will be treated as Guild ID

const GuildSchema = new Schema({
    _id: String,
    blacklisted: { type: Boolean, default: false },
    automodExcludedRole: String,
    blacklistedWords: { 
        type: [String], 
        default: []
    }
})

const GuildModel: Model<IGuild> = model('guild-settings', GuildSchema)

export default GuildModel