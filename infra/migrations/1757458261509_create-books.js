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
  pgm.createTable("books", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    title: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },

    author_id: {
      type: "uuid",
      references: "author_id",
    },

    cover_image_id: {
      type: "uuid",
      references: "images(id)",
    },

    published_date: {
      type: "date",
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
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
