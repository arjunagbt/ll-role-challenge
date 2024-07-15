import { Repository, EntitySchema } from "typeorm";
import { IAppointmentData } from "./appointment";

export interface UserDAOInterface {
}

export interface User {
    firstName: string;
    lastName: string;
    id: number;
    appointment: IAppointmentData
}

export interface IUserRepository {
    createUser(firstName: string, lastName: string, age: number): Promise<User>;
    getUserById(id: number): Promise<User | undefined>;
    getUserByName(firstName: string, lastName: string): Promise<User | undefined>;
    getAllUsers(): Promise<User[]>;
    updateUser(id: number, firstName: string, lastName: string, age: number): Promise<User | undefined>;
    deleteUser(id: number): Promise<void>;
  }