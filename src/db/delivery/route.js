import { Router } from 'express';
import { validateUuidParam } from '../../lib/validator.js';

import * as vehicleOperations from './query/vehicle.js';
import * as challanOperations from './query/challan.js';
import * as challanEntryOperations from './query/challan_entry.js';
import * as courierOperations from './query/courier.js';

const deliveryRouter = Router();

//* vehicle routes *//
deliveryRouter.get('/vehicle', vehicleOperations.selectAll);
deliveryRouter.get(
	'/vehicle/:uuid',
	validateUuidParam(),
	vehicleOperations.select
);
deliveryRouter.post('/vehicle', vehicleOperations.insert);
deliveryRouter.put('/vehicle/:uuid', vehicleOperations.update);
deliveryRouter.delete(
	'/vehicle/:uuid',
	validateUuidParam(),
	vehicleOperations.remove
);

//* challan routes *//
deliveryRouter.get('/challan', challanOperations.selectAll);
deliveryRouter.get(
	'/challan/:uuid',
	validateUuidParam(),
	challanOperations.select
);
deliveryRouter.post('/challan', challanOperations.insert);
deliveryRouter.put('/challan/:uuid', challanOperations.update);
deliveryRouter.delete(
	'/challan/:uuid',
	validateUuidParam(),
	challanOperations.remove
);

//* challan_entry routes *//
deliveryRouter.get('/challan-entry', challanEntryOperations.selectAll);
deliveryRouter.get(
	'/challan-entry/:uuid',
	validateUuidParam(),
	challanEntryOperations.select
);
deliveryRouter.post('/challan-entry', challanEntryOperations.insert);
deliveryRouter.put('/challan-entry/:uuid', challanEntryOperations.update);
deliveryRouter.delete(
	'/challan-entry/:uuid',
	validateUuidParam(),
	challanEntryOperations.remove
);

//* courier routes *//
deliveryRouter.get('/courier', courierOperations.selectAll);
deliveryRouter.get(
	'/courier/:uuid',
	validateUuidParam(),
	courierOperations.select
);
deliveryRouter.post('/courier', courierOperations.insert);
deliveryRouter.put('/courier/:uuid', courierOperations.update);
deliveryRouter.delete(
	'/courier/:uuid',
	validateUuidParam(),
	courierOperations.remove
);

export { deliveryRouter };
