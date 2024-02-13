import fs from 'node:fs/promises'
import path from 'node:path'

import { Client } from 'discord.js'
import { constants } from '../constant_resolver/ConstantResolver'

export class GatewayClient extends Client {
  private static readonly _instance = new this()

  public static getInstance (): GatewayClient {
    return this._instance
  }

  public static run =
    this.getInstance.bind(this)

  // ---

  constructor () {
    super(constants.GATEWAY_CLIENT_OPTIONS)

    process.setMaxListeners(Infinity)

    void this.loadEventHandlerImplements('event_handler/implements')
    void this.loadEventHandlerImplements('kico_challenges')
    void this.login(constants.BOT_TOKEN)
  }

  private async loadEventHandlerImplements (implementDirectoryPath: string): Promise<void> {
    const implementFullDirectoryPath =
      path.join(__dirname, '..', implementDirectoryPath)

    const implementNames =
      await fs.readdir(implementFullDirectoryPath)

    for (const implementName of implementNames) {
      void import(path.join(implementFullDirectoryPath, implementName))
        // eslint-disable-next-line new-cap
        .then((v) => new v.default())
    }
  }
}
