import chalk from 'chalk'
import moment from 'moment'

export class Logger {
  private static readonly _instances =
    new Map<string, Logger>()

  public static getInstance (loggerLabel: string): Logger {
    if (!this._instances.has(loggerLabel))
      this._instances.set(loggerLabel, new this(loggerLabel))

    return this._instances.get(loggerLabel) ?? new Logger('')
  }

  // ---

  constructor (
    private readonly loggerLabel: string
  ) {}

  public static readonly LogLevel = {
    ERROR: 'ERROR',
    WARN: 'WARN',
    INFO: 'INFO',
    VERBOSE: 'debug1'
  } as const

  private static readonly ColorMapping = {
    [Logger.LogLevel.ERROR]: chalk.bgRed,
    [Logger.LogLevel.WARN]: chalk.bgYellow,
    [Logger.LogLevel.INFO]: chalk.bgCyan,
    [Logger.LogLevel.VERBOSE]: chalk.gray
  } as const

  private static readonly LOGGER_STARTED = Date.now()

  public log (message: any): void
  public log (logLevel: typeof Logger.LogLevel[keyof typeof Logger.LogLevel], message: any): void

  public log (): void {
    let message = arguments[1] ?? arguments[0]
    const logLevel: typeof Logger.LogLevel[keyof typeof Logger.LogLevel] =
      arguments.length > 1 ? arguments[0] : Logger.LogLevel.VERBOSE

    if (typeof message !== 'string')
      message = JSON.stringify(message)

    message = `[${this.loggerLabel}] ${message}`

    const timePassed =
      (Date.now() - Logger.LOGGER_STARTED) / 1000 % 10000

    const timeField =
      `[${moment().format('YYMMDDThhmmss')}]+${timePassed.toFixed(3).padStart(8, '0')}`

    const logLevelField =
      Logger.ColorMapping[logLevel](`${
        logLevel
          .padStart(logLevel.length + Math.floor((8 - logLevel.length) / 2), ' ')
          .padEnd(8, ' ')}`)

    const messageField =
      chalk.gray(message)

    const fieldComposition =
      [timeField, logLevelField, messageField].join(' ')

    console.log(fieldComposition)
  }

  public logError (message: any): void {
    this.log(Logger.LogLevel.ERROR, message)
  }

  public logWarn (message: any): void {
    this.log(Logger.LogLevel.WARN, message)
  }

  public logInfo (message: any): void {
    this.log(Logger.LogLevel.INFO, message)
  }

  public logVerbose (message: any): void {
    this.log(Logger.LogLevel.VERBOSE, message)
  }
}
