import { Router } from 'express';
import { validateUuidParam } from '../../lib/validator.js';

import * as groupOperations from './query/group.js';
import * as categoryOperations from './query/category.js';
import * as brandOperations from './query/brand.js';
import * as sizeOperations from './query/size.js';
import * as vendorOperations from './query/vendor.js';
import * as productOperations from './query/product.js';
import * as branchOperations from './query/branch.js';

const storeRouter = Router();

//* group routes

storeRouter.get('/group', groupOperations.selectAll);
storeRouter.get('/group/:uuid', validateUuidParam(), groupOperations.select);
storeRouter.post('/group', groupOperations.insert);
storeRouter.put('/group/:uuid', groupOperations.update);
storeRouter.delete('/group/:uuid', validateUuidParam(), groupOperations.remove);

//* category routes

storeRouter.get('/category', categoryOperations.selectAll);
storeRouter.get(
	'/category/:uuid',
	validateUuidParam(),
	categoryOperations.select
);
storeRouter.post('/category', categoryOperations.insert);
storeRouter.put('/category/:uuid', categoryOperations.update);
storeRouter.delete(
	'/category/:uuid',
	validateUuidParam(),
	categoryOperations.remove
);

//* brand routes

storeRouter.get('/brand', brandOperations.selectAll);
storeRouter.get('/brand/:uuid', validateUuidParam(), brandOperations.select);
storeRouter.post('/brand', brandOperations.insert);
storeRouter.put('/brand/:uuid', brandOperations.update);
storeRouter.delete('/brand/:uuid', validateUuidParam(), brandOperations.remove);

//* size routes

storeRouter.get('/size', sizeOperations.selectAll);
storeRouter.get('/size/:uuid', validateUuidParam(), sizeOperations.select);
storeRouter.post('/size', sizeOperations.insert);
storeRouter.put('/size/:uuid', sizeOperations.update);
storeRouter.delete('/size/:uuid', validateUuidParam(), sizeOperations.remove);

//* vendor routes

storeRouter.get('/vendor', vendorOperations.selectAll);
storeRouter.get('/vendor/:uuid', validateUuidParam(), vendorOperations.select);
storeRouter.post('/vendor', vendorOperations.insert);
storeRouter.put('/vendor/:uuid', vendorOperations.update);
storeRouter.delete(
	'/vendor/:uuid',
	validateUuidParam(),
	vendorOperations.remove
);

//* product routes

storeRouter.get('/product', productOperations.selectAll);
storeRouter.get(
	'/product/:uuid',
	validateUuidParam(),
	productOperations.select
);
storeRouter.post('/product', productOperations.insert);
storeRouter.put('/product/:uuid', productOperations.update);
storeRouter.delete(
	'/product/:uuid',
	validateUuidParam(),
	productOperations.remove
);

//* branch routes

storeRouter.get('/branch', branchOperations.selectAll);
storeRouter.get('/branch/:uuid', validateUuidParam(), branchOperations.select);
storeRouter.post('/branch', branchOperations.insert);
storeRouter.put('/branch/:uuid', branchOperations.update);
storeRouter.delete(
	'/branch/:uuid',
	validateUuidParam(),
	branchOperations.remove
);

export { storeRouter };
