import { Repository } from 'typeorm';
import { User } from '../entity/User';

export class UserRepository extends Repository<User> {
      async createUser(firstName: string, lastName: string, age: number): Promise<User> {
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        return this.save(user);
      }
    
      async getUserById(id: number): Promise<User | undefined> {
        return this.createQueryBuilder('user')
          .where('user.id = :id', { id })
          .getOne();
      }

      async getUserByName(firstName: string, lastName: string): Promise<User | undefined> {
        return this.createQueryBuilder('user')
          .where('user.firstName = :firstName', { firstName })
          .andWhere('user.lastName = :lastName', { lastName })
          .getOne();
      }
    
      async getAllUsers(): Promise<User[]> {
        return this.createQueryBuilder('user')
          .getMany();
      }
    
      async updateUser(id: number, firstName: string, lastName: string): Promise<User | undefined> {
        await this.createQueryBuilder()
          .update(User)
          .set({ firstName, lastName })
          .where('id = :id', { id })
          .execute();
        return this.getUserById(id);
      }
    
      async deleteUser(id: number): Promise<void> {
        await this.createQueryBuilder()
          .delete()
          .from(User)
          .where('id = :id', { id })
          .execute();
      }
    }
    