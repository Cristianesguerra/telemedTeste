import { v4 as uuid } from 'uuid';

import { ICreateMedicDTO } from '../../dtos/ICreateMedicDTO';
import { Medic } from '../../infra/typeorm/entities/Medic';
import { IMedicsRepository } from '../IMedicsRepository';

class FakeUsersRepository implements IMedicsRepository {
  users: Medic[] = [];

  async create(data: ICreateMedicDTO): Promise<Medic> {
    const user = new Medic();

    Object.assign(user, { id: uuid(), ...data });

    this.users.push(user);

    return user;
  }

  async update(user: Medic): Promise<void> {
    const userIndex = this.users.findIndex(
      userToFind => userToFind.id === user.id,
    );

    this.users[userIndex] = user;
  }

  async findById(id: string): Promise<Medic> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<Medic> {
    return this.users.find(user => user.email === email);
  }

  async findByPhone(phone: string): Promise<Medic> {
    return this.users.find(user => user.phone1 === phone);
  }

  async findByLogin(login: string): Promise<Medic> {
    return this.users.find(user => user.login === login);
  }
}

export { FakeUsersRepository };
