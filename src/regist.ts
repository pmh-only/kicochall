import { REST, SlashCommandBuilder } from 'discord.js'
import { constants } from './constant_resolver/ConstantResolver'

const body: SlashCommandBuilder[] = [
  new SlashCommandBuilder()
    .setName('안녕')
    .setDescription('안녕을 출력합니다')
]

void new REST()
  .setToken(constants.BOT_TOKEN)
  .put(constants.TARGET_COMMAND_GROUP, { body })
