import { FakeUsersRepository } from '@modules/medics/repositories/fakes/FakeMedicsRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateMedicUseCase } from './CreateMedicUseCase';

let usersRepository: FakeUsersRepository;
let createMedicUseCase: CreateMedicUseCase;

describe('CreateUser', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();

    createMedicUseCase = new CreateMedicUseCase(usersRepository);
  });

  it('should be able to create an user', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone1: '(12)93456-7890',
      phone2: '(82)93556-3947',
      function: 'médico'
    };

    const medic = await createMedicUseCase.execute(userData);

    expect(medic).toHaveProperty('id');
  });

  it('should not be able to create an user with an email that is already in use', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone1: '(12)93456-7890',
      phone2: '(82)93556-3947',
      function: 'médico'
    };

    const anotherUserData = {
      name: 'Johny Doeh',
      password: '654321',
      login: 'johnydoeh',
      email: 'johndoe@email.com',
      phone1: '(21)65439-0987',
      phone2: '(82)93556-3947',
      function: 'médico'
    };

    await createMedicUseCase.execute(userData);

    await expect(
      createMedicUseCase.execute(anotherUserData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an user with an login that is already in use', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone1: '(12)93456-7890',
      phone2: '(82)93556-3947',
      function: 'médic'
    };

    const anotherUserData = {
      name: 'Johny Doeh',
      password: '654321',
      login: 'johndoe',
      email: 'johnydoeh@email.com',
      phone1: '(21)65439-0987',
      phone2: '(82)93556-3947',
      function: 'médic'
    };

    await createMedicUseCase.execute(userData);

    await expect(
      createMedicUseCase.execute(anotherUserData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an user with an email that is already in use', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone1: '(12)93456-7890',
      phone2: '(82)93556-3947',
      function: 'médico'
    };

    const anotherUserData = {
      name: 'Johny Doeh',
      password: '654321',
      login: 'johnydoeh',
      email: 'johnydoeh@email.com',
      phone1: '(12)93456-7890',
      phone2: '(82)93556-3947',
      function: 'médico'
    };

    await createMedicUseCase.execute(userData);

    await expect(
      createMedicUseCase.execute(anotherUserData),
    ).rejects.toBeInstanceOf(AppError);
  });
});
