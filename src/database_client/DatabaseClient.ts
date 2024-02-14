import { PrismaClient } from '@prisma/client'

export class DatabaseClient extends PrismaClient {
  private static readonly _instance = new this()

  public static getInstance (): DatabaseClient {
    return this._instance
  }
}
