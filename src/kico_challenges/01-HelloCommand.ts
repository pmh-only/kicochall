import { type Interaction, type Client, InteractionType, ApplicationCommandType } from 'discord.js'
import { EventHandler } from '../event_handler/EventHandler'
import { type Logger } from '../logger/Logger'

@EventHandler('interactionCreate')
export default class HelloCommand {
  public readonly client!: Client<true>
  public readonly logger!: Logger

  public async onEvent (interaction: Interaction): Promise<void> {
    // 1. 이벤트 필터링
    if (interaction.type !== InteractionType.ApplicationCommand)
      return

    if (interaction.commandType !== ApplicationCommandType.ChatInput)
      return

    if (interaction.commandName !== '안녕')
      return

    // 2. 안녕 출력
    await interaction.reply('안녕!')
  }
}
