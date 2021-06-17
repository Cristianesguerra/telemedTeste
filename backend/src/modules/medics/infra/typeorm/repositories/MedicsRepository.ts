import { getRepository, Repository } from 'typeorm';

import { ICreateMedicDTO } from '@modules/medics/dtos/ICreateMedicDTO';
import { IMedicsRepository } from '@modules/medics/repositories/IMedicsRepository';

import { Medic } from '../entities/Medic';

class MedicsRepository implements IMedicsRepository {
  private repository: Repository<Medic>;

  constructor() {
    this.repository = getRepository(Medic);
  }

  async create(data: ICreateMedicDTO): Promise<Medic> {
    const user = this.repository.create(data);

    await this.repository.save(user);

    return user;
  }

  async update(user: Medic): Promise<void> {
    await this.repository.save(user);
  }

  async findById(id: string): Promise<Medic> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<Medic> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async findByLogin(login: string): Promise<Medic> {
    const user = await this.repository.findOne({ where: { login } });

    return user;
  }

  async findByPhone(phone: string): Promise<Medic> {
    const user = await this.repository.findOne({ where: { phone } });

    return user;
  }
}

export { MedicsRepository };
