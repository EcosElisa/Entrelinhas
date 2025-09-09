/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable("authors", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gem_random_uuid()"),
        },

        name: {
            type: varchar("255"),
            notNull: true,
            unique: true,
        },

        create_at: {
            type: "timestampz",
            notNull: true,
            default: pgm.func("timezone('utc', now())"),
          },
      
          updated_at: {
            type: "timestampz",
            notNull: true,
            default: pgm.func("timezone('utc', now())"),
          }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
