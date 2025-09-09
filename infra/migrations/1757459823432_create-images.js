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
    pgm.createTable("images", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gem_random_uuid()"), 
        },

        url: {
            type: "varchar(2048)",
            notNull: true,
        },

        mimetype: {
            type: "varchar(100)",
            notNull: true,
        },

        size_bytes: {
            type: "bigint",
            notNull: true,
        },

        create_at: {
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
