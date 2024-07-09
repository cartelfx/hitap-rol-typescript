import { Client, GatewayIntentBits, Partials, Guild, Collection, GuildMember } from 'discord.js';
import { _self } from './classes/Client';
import { config } from './config';

/**
 * @type {_self}
 */
const _selfb = new _self({
    token: config.self_token
});

_selfb._con();

/**
 * @type {Client}
 */
const client = new Client({
    intents: (Object.keys(GatewayIntentBits) as (keyof typeof GatewayIntentBits)[])
        .map(
            (intent: keyof typeof GatewayIntentBits) =>
                GatewayIntentBits[intent as keyof typeof GatewayIntentBits] as typeof GatewayIntentBits[keyof typeof GatewayIntentBits]
        ) as typeof GatewayIntentBits[keyof typeof GatewayIntentBits][],
    partials: (Object.keys(Partials) as (keyof typeof Partials)[])
        .map(
            (partial: keyof typeof Partials) =>
                Partials[partial as keyof typeof Partials] as typeof Partials[keyof typeof Partials]
        )
});

/**
 * @type {string[]}
 */
const testttt = ['cartelfx', 'acer'];

/**
 * @returns {Promise<void>}
 */

client.on('ready', () => {
    console.log(`${client.user?.tag} ✓`);
    setInterval(async (): Promise<void> => {
        const guild: Guild | undefined = await client.guilds.fetch(config.guild);
        if (!guild) return;
    
        const role = await guild.roles.fetch(config.role);
        if (!role) return;
    
        const members: Collection<string, GuildMember> = await guild.members.fetch();
        for (const member of members.values()) {
                /**
                 * @type {Promise<unknown>}
                 */
                let acerim = await _selfb._user(member.id)
                const _data = await acerim?.getProfile();
    
                if (!_data || !_data.pronouns) return;
    
                /**
                 * @type {boolean}
                 */
                const acer = testttt.some(pronoun => _data.pronouns!.includes(pronoun));
    
                if (acer) {
                    if (!member.roles.cache.has(role.id)) {
                        await member.roles.add(role);
                        console.log(`"${member.user.username}" rol verildi.`);
                    }
                } else {
                    if (member.roles.cache.has(role.id)) {
                        await member.roles.remove(role);
                        console.log(`"${member.user.username}" rolden alındı.`);
                    }
                }
        }
    }, 60 * 1000);
});

/**
 * @type {string}
 */

client.login(config.token);