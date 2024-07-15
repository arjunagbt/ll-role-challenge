import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { Appointment } from "./Appointment"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @ManyToOne(() => Appointment)
    appointment: Appointment
}
