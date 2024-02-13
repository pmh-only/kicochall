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

    void this.loadEventHandlers()
    void this.login(constants.BOT_TOKEN)
  }

  private async loadEventHandlers (): Promise<void> {
    const handlerImplementsPath =
      path.join(__dirname, '../event_handler/implements')

    const handlerImplements =
      await fs.readdir(handlerImplementsPath)

    for (const handlerImplement of handlerImplements) {
      void import(path.join(handlerImplementsPath, handlerImplement))
        // eslint-disable-next-line new-cap
        .then((v) => new v.default())
    }
  }
}
