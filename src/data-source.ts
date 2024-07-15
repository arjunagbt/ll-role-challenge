import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Appointment } from "./entity/Appointment"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "arslan",
    password: "",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User, Appointment],
    migrations: [],
    subscribers: [],
})
