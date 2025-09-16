/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("books", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    open_library_key: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    title: {
      type: "varchar(255)",
      notNull: true,
    },
    author_name: {
      type: "varchar(255)",
    },
    cover_url: {
      type: "varchar(2048)",
    },
    first_publish_year: {
      type: "integer",
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });
};

exports.down = (pgm) => {};
