"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'callmaster',
    synchronize: false,
    logging: true,
    entities: [(0, path_1.join)(__dirname, '../modules/**/*.orm-entity{.ts,.js}')],
    migrations: [(0, path_1.join)(__dirname, '../database/migrations/*{.ts,.js}')],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map