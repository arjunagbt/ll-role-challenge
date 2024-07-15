import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { User } from "./User"

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: string

    @Column()
    time: string

    @Column()
    available_slots: number

    @OneToMany(() => User, user => user.appointment)
    users: User[]
}
