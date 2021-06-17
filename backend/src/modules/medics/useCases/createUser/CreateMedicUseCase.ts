import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { Medic } from '@modules/medics/infra/typeorm/entities/Medic';
import { AppError } from '@shared/errors/AppError';

import { ICreateMedicDTO } from '../../dtos/ICreateMedicDTO';
import { IMedicsRepository } from '../../repositories/IMedicsRepository';

@injectable()
class CreateMedicUseCase {
  constructor(
    @inject('MedicsRepository')
    private medicsRepository: IMedicsRepository,
  ) {}

  async execute({
    name,
    password,
    email,
    login,
    phone1,
    phone2,
    function
  }: ICreateMedicDTO): Promise<Medic> {
    const emailAlreadyInUse = await this.medicsRepository.findByEmail(email);

    if (emailAlreadyInUse) {
      throw new AppError('Este e-mail já está em uso.');
    }

    const loginAlreadyInUse = await this.medicsRepository.findByLogin(login);

    if (loginAlreadyInUse) {
      throw new AppError('Este login já está em uso.');
    }

    const parsedPhone1 = phone1.replace(/[^a-z0-9]/gi, '');
    const parsedPhone2 = phone2.replace(/[^a-z0-9]/gi, '');

    const phoneAlreadyInUse = await this.medicsRepository.findByPhone(
      parsedPhone1,
    );

    if (phoneAlreadyInUse) {
      throw new AppError('Este número de telefone já está em uso.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.medicsRepository.create({
      name,
      password: hashedPassword,
      email,
      login,
      phone1: parsedPhone1,
      phone2: parsedPhone2,
      function
    });

    return user;
  }
}

export { CreateMedicUseCase };
