import { Router } from 'express';

import { userRoutes } from './medics.routes';

const router = Router();

router.use('/users', userRoutes);

export { router };
