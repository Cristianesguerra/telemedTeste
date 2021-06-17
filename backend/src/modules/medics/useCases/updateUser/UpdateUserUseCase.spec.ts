import { FakeUsersRepository } from '@modules/medics/repositories/fakes/FakeMedicsRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateMedicUseCase } from '../createUser/CreateMedicUseCase';
import { UpdateUserUseCase } from './UpdateUserUseCase';

let usersRepository: FakeUsersRepository;
let updateUserUseCase: UpdateUserUseCase;
let createMedicUseCase: CreateMedicUseCase;

describe('UpdateUser', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();

    updateUserUseCase = new UpdateUserUseCase(usersRepository);
    createMedicUseCase = new CreateMedicUseCase(usersRepository);
  });

  it('should be able to update user data', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone1: '(12)93456-7890',
      phone2: '(82)93556-3947',
      function: 'médico'
    };

    const oldUser = await createMedicUseCase.execute(userData);

    const updatedUser = await updateUserUseCase.execute({
      id: oldUser.id,
      name: 'Regis Faria',
      currentPassword: '123456',
      newPassword: '654321',
      email: 'regis@email.com',
      login: 'regisfaria',
      phone: '(21)98832-0192',
    });

    expect(updatedUser.name).toBe('Regis Faria');
    expect(updatedUser.email).toBe('regis@email.com');
    expect(updatedUser.login).toBe('regisfaria');
  });

  it('should be able to update only one user information', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone1: '(12)93456-7890',
      phone2: '(82)93556-3947',
      function: 'médico'
    };

    const oldUser = await createMedicUseCase.execute(userData);

    const updatedUser = await updateUserUseCase.execute({
      id: oldUser.id,
      login: 'gisreriafa',
    });

    expect(updatedUser.name).toBe('Regis Faria');
  });

  it('should not be able to update one user without passing any new values', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone1: '(12)93456-7890',
      phone2: '(82)93556-3947',
      function: 'médico'
    };

    const oldUser = await createMedicUseCase.execute(userData);

    await expect(
      updateUserUseCase.execute({
        id: oldUser.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a non-existing user', async () => {
    await expect(
      updateUserUseCase.execute({
        id: 'non-existing-id',
        name: 'Regis Faria',
        currentPassword: '123456',
        newPassword: '654321',
        email: 'regis@email.com',
        login: 'regisfaria',
        phone: '(21)98832-0192',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user email into an email that is already in use', async () => {
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
      phone1: '(21)65439-0987',
      phone2: '(82)93556-3947',
      function: 'médico'
    };

    const oldUser = await createMedicUseCase.execute(userData);

    await createMedicUseCase.execute(anotherUserData);

    await expect(
      updateUserUseCase.execute({
        id: oldUser.id,
        email: 'johnydoeh@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user login into a login that is already in use', async () => {
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
      phone1: '(21)65439-0987',
      phone2: '(82)93556-3947',
      function: 'médico'
    };

    const oldUser = await createMedicUseCase.execute(userData);

    await createMedicUseCase.execute(anotherUserData);

    await expect(
      updateUserUseCase.execute({
        id: oldUser.id,
        login: 'johnydoeh',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user phone into a phone that is already in use', async () => {
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
      phone1: '(21)65439-0987',
      phone2: '(82)93556-3947',
      function: 'médico'
    };

    const oldUser = await createMedicUseCase.execute(userData);

    await createMedicUseCase.execute(anotherUserData);

    await expect(
      updateUserUseCase.execute({
        id: oldUser.id,
        phone: '(21)65439-0987',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user password with a wrong currentPassword', async () => {
    const userData = {
      name: 'John Doe',
      password: '123456',
      login: 'johndoe',
      email: 'johndoe@email.com',
      phone1: '(12)93456-7890',
      phone2: '(82)93556-3947',
      function: 'médico'
    };

    const oldUser = await createMedicUseCase.execute(userData);

    await expect(
      updateUserUseCase.execute({
        id: oldUser.id,
        newPassword: '12345677',
        currentPassword: '123141',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
