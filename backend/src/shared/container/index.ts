import { container } from 'tsyringe';

import { MedicsRepository } from '@modules/medics/infra/typeorm/repositories/MedicsRepository';
import { IMedicsRepository } from '@modules/medics/repositories/IMedicsRepository';

container.registerSingleton<IMedicsRepository>(
  'MedicsRepository',
  MedicsRepository,
);
