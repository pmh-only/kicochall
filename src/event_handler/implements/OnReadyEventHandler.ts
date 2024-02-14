import { type Client } from 'discord.js'
import { EventHandler } from '../EventHandler'
import { type Logger } from '../../logger/Logger'
import { type DatabaseClient } from '../../database_client/DatabaseClient'

@EventHandler('ready')
export default class OnReadyEventHandler {
  public readonly client!: Client<true>
  public readonly logger!: Logger
  public readonly db!: DatabaseClient

  public onEvent (): void {
    this.logger.logInfo(`${this.client.user.username} is now ready!`)
  }
}
