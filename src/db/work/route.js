import { Router } from 'express';
import { validateUuidParam } from '../../lib/validator.js';

import * as problemOperations from './query/problem.js';
import * as orderOperations from './query/order.js';
import * as diagnosisOperations from './query/diagnosis.js';
import * as sectionOperations from './query/section.js';
import * as processOperations from './query/process.js';

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

//* diagnosis routes *//
workRouter.get('/diagnosis', diagnosisOperations.selectAll);
workRouter.get(
	'/diagnosis/:uuid',
	validateUuidParam(),
	diagnosisOperations.select
);
workRouter.post('/diagnosis', diagnosisOperations.insert);
workRouter.put('/diagnosis/:uuid', diagnosisOperations.update);
workRouter.delete(
	'/diagnosis/:uuid',
	validateUuidParam(),
	diagnosisOperations.remove
);

//* section routes *//
workRouter.get('/section', sectionOperations.selectAll);
workRouter.get('/section/:uuid', validateUuidParam(), sectionOperations.select);
workRouter.post('/section', sectionOperations.insert);
workRouter.put('/section/:uuid', sectionOperations.update);
workRouter.delete(
	'/section/:uuid',
	validateUuidParam(),
	sectionOperations.remove
);

//* process routes *//
workRouter.get('/process', processOperations.selectAll);
workRouter.get('/process/:uuid', validateUuidParam(), processOperations.select);
workRouter.post('/process', processOperations.insert);
workRouter.put('/process/:uuid', processOperations.update);
workRouter.delete(
	'/process/:uuid',
	validateUuidParam(),
	processOperations.remove
);

export { workRouter };
