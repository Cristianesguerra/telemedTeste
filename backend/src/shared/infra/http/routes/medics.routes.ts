import { Router } from 'express';

import { CreateMedicController } from '@modules/medics/useCases/createUser/CreateMedicController';
import { UpdateUserController } from '@modules/medics/useCases/updateUser/UpdateUserController';

const userRoutes = Router();

const createUserController = new CreateMedicController();
const updateUserController = new UpdateUserController();

userRoutes.post('/', createUserController.handle);
userRoutes.put('/:id', updateUserController.handle);

export { userRoutes };
