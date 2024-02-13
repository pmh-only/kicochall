import { Logger } from '../logger/Logger'
import { type ConstantResolver } from './ConstantResolver'

export const ImportantConstant = (target: ConstantResolver, propertyKey: string): void => {
  let value: any = ''
  const logger = Logger.getInstance(ImportantConstant.name)

  Object.defineProperty(target, propertyKey, {
    get: () => value,
    set: (newValue) => {
      if (typeof newValue === 'number' && !Number.isNaN(newValue)) {
        value = newValue
        return
      }

      if (typeof newValue === 'string' && newValue.trim().length > 0) {
        value = newValue
        return
      }

      if (Array.isArray(newValue) && newValue.length > 0) {
        value = newValue
        return
      }

      if (Object.values(newValue as ArrayLike<unknown>).length > 0) {
        value = newValue
        return
      }

      logger.logError(`Important constant, ${propertyKey} is not provided or empty. please review the documents and check your environment variable or file.`)
      process.exit(-1)
    }
  })
}
