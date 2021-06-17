import { ICreateMedicDTO } from '../dtos/ICreateMedicDTO';
import { Medic } from '../infra/typeorm/entities/Medic';

export interface IMedicsRepository {
  create(data: ICreateMedicDTO): Promise<Medic>;
  update(user: Medic): Promise<void>;
  findById(id: string): Promise<Medic>;
  findByEmail(email: string): Promise<Medic>;
  findByPhone(phone: string): Promise<Medic>;
  findByLogin(login: string): Promise<Medic>;
}
