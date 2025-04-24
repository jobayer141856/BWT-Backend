import { Router } from 'express';
import { validateUuidParam } from '../../lib/validator.js';

import * as problemOperations from './query/problem.js';
import * as orderOperations from './query/order.js';
import * as diagnosisOperations from './query/diagnosis.js';
import * as sectionOperations from './query/section.js';
import * as processOperations from './query/process.js';
import * as infoOperations from './query/info.js';
import * as accessoryOperations from './query/accessory.js';
import * as zoneOperations from './query/zone.js';

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

//* info routes *//
workRouter.get('/info', infoOperations.selectAll);
workRouter.get('/info/:uuid', validateUuidParam(), infoOperations.select);
workRouter.post('/info', infoOperations.insert);
workRouter.put('/info/:uuid', infoOperations.update);
workRouter.delete('/info/:uuid', validateUuidParam(), infoOperations.remove);
workRouter.get(
	'/order-details-by-info/:info_uuid',
	infoOperations.selectOrderDetailsByInfo
);

//* order routes *//
workRouter.get('/order', orderOperations.selectAll);
workRouter.get('/order/:uuid', validateUuidParam(), orderOperations.select);
workRouter.post('/order', orderOperations.insert);
workRouter.put('/order/:uuid', orderOperations.update);
workRouter.delete('/order/:uuid', validateUuidParam(), orderOperations.remove);
workRouter.get(
	'/diagnosis-details-by-order/:order_uuid',
	orderOperations.selectDiagnosisDetailsByOrder
);
workRouter.get('/order-by-info/:info_uuid', orderOperations.selectByInfo);

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
workRouter.get(
	'/diagnosis-by-order/:order_uuid',
	diagnosisOperations.selectByOrder
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

//* accessory routes *//

workRouter.get('/accessory', accessoryOperations.selectAll);
workRouter.get(
	'/accessory/:uuid',
	validateUuidParam(),
	accessoryOperations.select
);
workRouter.post('/accessory', accessoryOperations.insert);
workRouter.put('/accessory/:uuid', accessoryOperations.update);
workRouter.delete(
	'/accessory/:uuid',
	validateUuidParam(),
	accessoryOperations.remove
);

//* zone routes *//
workRouter.get('/zone', zoneOperations.selectAll);
workRouter.get('/zone/:uuid', validateUuidParam(), zoneOperations.select);
workRouter.post('/zone', zoneOperations.insert);
workRouter.put('/zone/:uuid', zoneOperations.update);
workRouter.delete('/zone/:uuid', validateUuidParam(), zoneOperations.remove);

export { workRouter };
