import { Appointment } from "../entity/Appointment";
import { User } from "../entity/User";

export interface IAppointmentService {
    createAppointment(appointmentData: IAppointmentData): IAppointmentData
}

export interface IAppointmentData {
    id: number;
    date: string;
    time: string;
    available_slots: number;
    users?: User[];
}

export interface IAppointmentRequest {
    date: string;
    time: string;
    userId: number;
    firstName: string;
    lastName: string;
    slotCount: number
}

export interface IAppointmentRepository {
    createAppointment(time: string, date: string): Promise<IAppointmentData>;
    getAppointmentById(id: number): Promise<Appointment | undefined>;
    getAppointmentByDateAndTime(date: string, time: string): Promise<Appointment | undefined>;
    getAllAppointments(): Promise<Appointment[]>;
    updateAppointment(id: number, appointmentData: IAppointmentRequest): Promise<Appointment | undefined>;
    deleteAppointment(id: number, appointmentData: IAppointmentRequest): Promise<void>;
  }