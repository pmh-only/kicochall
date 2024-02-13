import 'dotenv/config'
import { type GatewayIntentsString, Routes, type ClientOptions } from 'discord.js'
import { ImportantConstant } from './ConstantUtils'
import { Logger } from '../logger/Logger'

export class ConstantResolver implements Record<string, any> {
  private readonly logger =
    Logger.getInstance(ConstantResolver.name)

  @ImportantConstant
  public readonly BOT_TOKEN =
      process.env.BOT_TOKEN ?? ''

  @ImportantConstant
  private readonly APPLICATION_ID =
      process.env.APPLICATION_ID ?? ''

  private readonly TARGET_GUILD_ID =
    process.env.TARGET_GUILD_ID ?? ''

  public get TARGET_COMMAND_GROUP (): `/${string}` {
    if (this.TARGET_GUILD_ID.trim().length > 0)
      return Routes.applicationGuildCommands(this.APPLICATION_ID, this.TARGET_GUILD_ID)

    this.logger.logWarn('Using global application command group')

    return Routes.applicationCommands(this.APPLICATION_ID)
  }

  @ImportantConstant
  private readonly GATEWAY_INTENTS: GatewayIntentsString[] = [
      'Guilds',
      'GuildMessages',
      'DirectMessages',
      'MessageContent'
    ]

  @ImportantConstant
  public readonly GATEWAY_CLIENT_OPTIONS: ClientOptions = {
      intents: this.GATEWAY_INTENTS
    }
}

export const constants =
  new ConstantResolver()
