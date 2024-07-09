import { Client, User } from "discord.js-selfbot-v13";

/**
 * @type {_self}
 */
export class _self extends Client<boolean> {
    private cl?: string;

    /**
     * @param {Object} [opt]
     * @param {string} [opt.token]
     */
    constructor(opt?: { token?: string }) {
        super({
            intents: [32767],
            checkUpdate: false
        });

        this.cl = opt?.token;
    }

    /**
     * @returns {Promise<void>}
     */
    async _con(): Promise<void> {
        if (!this.cl) {
            return;
        }

        await this.login(this.cl);
        this.on('ready', () => {
            console.log(`${this.user?.username} girişNYAPTIAIQIÜIZÇMAŞSMÜS`)
        })
    }

    /**
     * @param {string} id
     * @returns {Promise<User | undefined>}
     */
    async _user(id: string): Promise<User | undefined> {
        const user = await this.users.fetch(id);
        return user;
    }
}