import { Router } from 'express';
import { validateUuidParam } from '../../lib/validator.js';

import * as problemOperations from './query/problem.js';
import * as orderOperations from './query/order.js';

const workRouter = Router();

//* problem routes *//
workRouter.get('/problem', problemOperations.selectAll);
workRouter.get('/problem/:uuid', validateUuidParam(), problemOperations.select);
workRouter.post('/problem', problemOperations.insert);
workRouter.put('/problem/:uuid', problemOperations.update);
workRouter.delete(
	'/problem/:uuid',
	validateUuidParam(),
	problemOperations.remove
);

//* order routes *//
workRouter.get('/order', orderOperations.selectAll);
workRouter.get('/order/:uuid', validateUuidParam(), orderOperations.select);
workRouter.post('/order', orderOperations.insert);
workRouter.put('/order/:uuid', orderOperations.update);
workRouter.delete('/order/:uuid', validateUuidParam(), orderOperations.remove);

export { workRouter };
