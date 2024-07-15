import moment  from 'moment';
import { IAppointmentData, IAppointmentService, IAppointmentRequest } from "../interfaces/appointment"
import { IAppointmentRepository } from "../interfaces/appointment";
import { IUserRepository } from "../interfaces/user";
import { StandardError } from "../utils/StandardError";

export class AppointmentService implements IAppointmentService {
    private appointmentRepository: IAppointmentRepository;
    private userRepository: IUserRepository
    constructor(appointmentRepo, userRepo) {
        this.appointmentRepository = appointmentRepo;
        this.userRepository = userRepo;
    }
    async createAppointment(appointmentRequest: IAppointmentRequest): Promise<IAppointmentData> {
        const { time, date, slotCount, firstName, lastName } = appointmentRequest;
        const appointment = await this.appointmentRepository.getAppointmentByDateAndTime(date, time);
        const user = await this.userRepository.getUserByName(firstName, lastName);
        if(user) {
            appointmentRequest.userId = user.id;
        } else {
            throw new StandardError('USER_NOT_FOUND', 'User not registered', null, { firstName, lastName })
        }
        if(appointment) {
            if(this.isTimeSlotAvailable(appointment, slotCount)) {
                return await this.appointmentRepository.updateAppointment(appointment.id, appointmentRequest);
            } else {
                throw new StandardError('TIME_SLOT_NOT_AVAILABLE', 'Time slot not available', null, appointmentRequest);
            }
        } else {
            if(this.isWorkingTime(time, date)) {
                const newAppointment = await this.appointmentRepository.createAppointment(
                    time, date
                )
                return await this.appointmentRepository.updateAppointment(newAppointment.id, appointmentRequest);
            } else {
                throw new StandardError('TIME_SLOT_NOT_AVAILABLE', 'Time slot not available', null, appointmentRequest);
            }
        }
    }

    isWorkingTime(time, date): boolean {
        const dateObj = moment(`${date} ${time}`);
        const isWorkingDay = dateObj.day() >= 1 && dateObj.day() <= 5;
        const isWorkingHour = dateObj.hour() >= 9 && dateObj.hour() <= 18
        return isWorkingDay && isWorkingHour;
    }

    async isTimeSlotAvailable(appointment, number): Promise<boolean> {
        if(appointment.available_slots < number) {
            return false
        } else {
            return true;
        }
    }

    getAllAppointments
}