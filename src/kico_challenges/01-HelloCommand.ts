import { type Client, InteractionType, ApplicationCommandType, type ChatInputCommandInteraction } from 'discord.js'
import { EventHandler } from '../event_handler/EventHandler'
import { type Logger } from '../logger/Logger'
import { type DatabaseClient } from '../database_client/DatabaseClient'

@EventHandler('interactionCreate')
export default class HelloCommand {
  public readonly client!: Client<true>
  public readonly logger!: Logger
  public readonly db!: DatabaseClient

  // ---

  public async onEvent (interaction: ChatInputCommandInteraction): Promise<void> {
    if (this.isCorrectInteraction(interaction))
      await interaction.reply('안녕!')
  }

  // ---

  private readonly isCorrectInteraction = (interaction: ChatInputCommandInteraction): boolean =>
    interaction.type === InteractionType.ApplicationCommand &&
    interaction.commandType === ApplicationCommandType.ChatInput &&
    interaction.commandName === '안녕'
}
