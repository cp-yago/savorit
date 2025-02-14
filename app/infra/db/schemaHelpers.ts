import * as t from "drizzle-orm/pg-core";


export const createdAt = t.timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()

export const updatedAt = t.timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())

export const timestamps = {
    createdAt,
    updatedAt,
    deletedAt: t.timestamp(),
}

export const id = t.uuid().primaryKey().defaultRandom()