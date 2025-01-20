import { Router } from 'express';
import { validateUuidParam } from '../../lib/validator.js';

import * as problemOperations from './query/problem.js';

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

export { workRouter };
