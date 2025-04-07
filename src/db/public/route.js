import { Router } from 'express';
import { validateUuidParam } from '../../lib/validator.js';

import * as publicOperations from './query/public.js';

const publicRouter = Router();

//* work info routes *//

publicRouter.get(
	'/work/order-details-by-info/:info_uuid',
	publicOperations.selectOrderDetailsByInfoForPublic
);

export { publicRouter };
