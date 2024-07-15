import { Repository } from 'typeorm';
import { Appointment } from '../entity/Appointment';
import { User } from '../entity/User';

export class AppointmentRepository extends Repository<Appointment> {
    async createAppointment(time: string, date: string): Promise<Appointment> {
        const appointment = new Appointment();
        appointment.date = date;
        appointment.time = time;
        appointment.available_slots = 5;
        return this.save(appointment);
      }
    
    async getAppointmentById(id): Promise<Appointment | undefined> {
        return this.createQueryBuilder('appointment')
          .where('appointment.id = :id', { id })
          .getOne();
      }

    async getAppointmentByDateAndTime(date: string, time: string): Promise<Appointment | undefined> {
        return this.createQueryBuilder('appointment')
          .where('appointment.date = :date', { date })
          .andWhere('appointment.time = :time', { time })
          .getOne();
      }
    
    async getAllAppointments(): Promise<Appointment[]> {
        return this.createQueryBuilder('appointment')
          .getMany();
      }
    
    async updateAppointment(id, appointmentRequest): Promise<Appointment | undefined> {
        await this.createQueryBuilder()
          .relation(User, 'appointment')
          .update(Appointment)
          .set({
            available_slots: appointmentRequest.remainingSlot,
            users: () => `array_append(users, ${appointmentRequest.userId})`
          })
          .where('id = :id', { id })
          .execute();
        return this.getAppointmentById(id);
      }
    }
    