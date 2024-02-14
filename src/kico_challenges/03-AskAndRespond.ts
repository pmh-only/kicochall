import { type Client, type Message } from 'discord.js'
import { EventHandler } from '../event_handler/EventHandler'
import { type Logger } from '../logger/Logger'
import { type DatabaseClient } from '../database_client/DatabaseClient'

@EventHandler('messageCreate')
export default class AskAndRespond {
  public readonly client!: Client<true>
  public readonly logger!: Logger
  public readonly db!: DatabaseClient

  // ---

  public async onEvent (message: Message): Promise<void> {
    if (!this.isCorrectMessage(message))
      return

    const respondWords =
      await this.retrieveRespondWords(message)

    const respondWord =
      this.pickRandomItem(respondWords) ??
      '에... 그런말 몰라요..'

    const content =
      this.postprocessWord(respondWord)

    void message.reply({
      content,
      allowedMentions: {
        parse: []
      }
    })
  }

  // ---

  private readonly isCorrectMessage = (message: Message): boolean =>
    !message.author.bot &&
    message.content.startsWith('프흠아 ') &&
    message.content.split(' ').length > 1

  private readonly retrieveRespondWords = async (message: Message): Promise<string[]> => {
    const askWord =
      message.content
        .substring(3)
        .trim()

    const conversations = await this.db.conversations.findMany({
      select: { respondWord: true },
      where: { askWord }
    })

    return conversations
      .map((v) => v.respondWord)
  }

  private readonly pickRandomItem = <T>(items: T[]): T =>
    items[Math.floor(Math.random() * items.length)]

  private readonly postprocessWord = (word: string): string =>
    `${word.trim().substring(0, 1995)}${word.trim().length > 1995 ? '...' : ''}`
}
