import { SequelizeOptions } from "sequelize-typescript";

export const DBconfig: SequelizeOptions = {
  dialect: 'sqlite',
  storage: './data/database.sqlite',
  logging: false
}

export const DBconfig_mem: SequelizeOptions = {
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
};