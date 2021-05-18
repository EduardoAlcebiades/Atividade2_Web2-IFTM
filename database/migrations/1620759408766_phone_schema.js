"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PhoneSchema extends Schema {
  up() {
    this.create("phones", (table) => {
      table.increments();
      table.string("number").notNullable();
      table.boolean("preferential").notNullable().defaultTo(false);
      table.timestamps();
      table
        .integer("client_id")
        .references("id")
        .inTable("clients")
        .unsigned()
        .notNullable()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  }

  down() {
    this.drop("phones");
  }
}

module.exports = PhoneSchema;
