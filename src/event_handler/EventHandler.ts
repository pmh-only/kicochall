import { type ClientEvents, type Client, type Awaitable } from 'discord.js'
import { GatewayClient } from '../gateway_client/GatewayClient'
import { Logger } from '../logger/Logger'
import { DatabaseClient } from '../database_client/DatabaseClient'

export class BasicEventHandler<EventType extends keyof ClientEvents> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor (..._: any[]) {}

  public readonly client!: Client

  public readonly logger!: Logger

  public readonly db!: DatabaseClient

  public onEvent (...args: ClientEvents[EventType]): Awaitable<void> {

  }
}

export const EventHandler =
  <EventType extends keyof ClientEvents>(eventType: EventType) =>
  <T extends typeof BasicEventHandler<EventType>>(target: T): T =>
      class extends target {
        public client = GatewayClient.getInstance()

        public logger = Logger.getInstance(target.name)

        public db = DatabaseClient.getInstance()

        constructor (..._: any[]) {
          super()
          this.client.on(eventType, this.onEvent.bind(this))
        }
      }
