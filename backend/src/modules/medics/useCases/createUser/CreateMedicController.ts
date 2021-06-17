import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateMedicUseCase } from './CreateMedicUseCase';

class CreateMedicController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      name, 
      password, 
      email, 
      login, 
      phone1, 
      phone2, 
      function,  
    } = request.body;

    const createMedic = container.resolve(CreateMedicUseCase);

    const user = await createMedic.execute({
      name,
      password,
      email,
      login,
      phone1,
      phone2,
      function,
    });

    return response.status(201).json({ user });
  }
}

export { CreateMedicController };
