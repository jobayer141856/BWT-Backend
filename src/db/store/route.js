import { Router } from 'express';
import { validateUuidParam } from '../../lib/validator.js';

import * as groupOperations from './query/group.js';
import * as categoryOperations from './query/category.js';
import * as brandOperations from './query/brand.js';
import * as sizeOperations from './query/size.js';
import * as vendorOperations from './query/vendor.js';
import * as productOperations from './query/product.js';
import * as branchOperations from './query/branch.js';
import * as boxOperations from './query/box.js';
import * as floorOperations from './query/floor.js';
import * as purchaseEntryOperations from './query/purchase_entry.js';
import * as purchaseOperations from './query/purchase.js';
import * as rackOperations from './query/rack.js';
import * as roomOperations from './query/room.js';
import * as stockOperations from './query/stock.js';
import * as warehouseOperations from './query/warehouse.js';
import store from './schema.js';

const storeRouter = Router();

//* group routes *//

storeRouter.get('/group', groupOperations.selectAll);
storeRouter.get('/group/:uuid', validateUuidParam(), groupOperations.select);
storeRouter.post('/group', groupOperations.insert);
storeRouter.put('/group/:uuid', groupOperations.update);
storeRouter.delete('/group/:uuid', validateUuidParam(), groupOperations.remove);

//* category routes *//

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

//* brand routes *//

storeRouter.get('/brand', brandOperations.selectAll);
storeRouter.get('/brand/:uuid', validateUuidParam(), brandOperations.select);
storeRouter.post('/brand', brandOperations.insert);
storeRouter.put('/brand/:uuid', brandOperations.update);
storeRouter.delete('/brand/:uuid', validateUuidParam(), brandOperations.remove);

//* size routes *//

storeRouter.get('/size', sizeOperations.selectAll);
storeRouter.get('/size/:uuid', validateUuidParam(), sizeOperations.select);
storeRouter.post('/size', sizeOperations.insert);
storeRouter.put('/size/:uuid', sizeOperations.update);
storeRouter.delete('/size/:uuid', validateUuidParam(), sizeOperations.remove);

//* vendor routes *//

storeRouter.get('/vendor', vendorOperations.selectAll);
storeRouter.get('/vendor/:uuid', validateUuidParam(), vendorOperations.select);
storeRouter.post('/vendor', vendorOperations.insert);
storeRouter.put('/vendor/:uuid', vendorOperations.update);
storeRouter.delete(
	'/vendor/:uuid',
	validateUuidParam(),
	vendorOperations.remove
);

//* product routes *//

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

//* branch routes *//

storeRouter.get('/branch', branchOperations.selectAll);
storeRouter.get('/branch/:uuid', validateUuidParam(), branchOperations.select);
storeRouter.post('/branch', branchOperations.insert);
storeRouter.put('/branch/:uuid', branchOperations.update);
storeRouter.delete(
	'/branch/:uuid',
	validateUuidParam(),
	branchOperations.remove
);

//* box routes *//

storeRouter.get('/box', boxOperations.selectAll);
storeRouter.get('/box/:uuid', validateUuidParam(), boxOperations.select);
storeRouter.post('/box', boxOperations.insert);
storeRouter.put('/box/:uuid', boxOperations.update);
storeRouter.delete('/box/:uuid', validateUuidParam(), boxOperations.remove);

//* floor routes *//

storeRouter.get('/floor', floorOperations.selectAll);
storeRouter.get('/floor/:uuid', validateUuidParam(), floorOperations.select);
storeRouter.post('/floor', floorOperations.insert);
storeRouter.put('/floor/:uuid', floorOperations.update);
storeRouter.delete('/floor/:uuid', validateUuidParam(), floorOperations.remove);

//* purchase_entry routes *//

storeRouter.get('/purchase-entry', purchaseEntryOperations.selectAll);
storeRouter.get(
	'/purchase-entry/:uuid',
	validateUuidParam(),
	purchaseEntryOperations.select
);
storeRouter.post('/purchase-entry', purchaseEntryOperations.insert);
storeRouter.put('/purchase-entry/:uuid', purchaseEntryOperations.update);
storeRouter.delete(
	'/purchase-entry/:uuid',
	validateUuidParam(),
	purchaseEntryOperations.remove
);
storeRouter.get(
	'/purchase-entry/by/:purchase_uuid',
	purchaseEntryOperations.selectByPurchaseUuid
);

//* purchase routes *//

storeRouter.get('/purchase', purchaseOperations.selectAll);
storeRouter.get(
	'/purchase/:uuid',
	validateUuidParam(),
	purchaseOperations.select
);
storeRouter.post('/purchase', purchaseOperations.insert);
storeRouter.put('/purchase/:uuid', purchaseOperations.update);
storeRouter.delete(
	'/purchase/:uuid',
	validateUuidParam(),
	purchaseOperations.remove
);
storeRouter.get(
	'/purchase/purchase-entry-details/by/:purchase_uuid',
	purchaseOperations.selectPurchaseEntryDetailsByPurchaseUuid
);

//* rack routes *//

storeRouter.get('/rack', rackOperations.selectAll);
storeRouter.get('/rack/:uuid', validateUuidParam(), rackOperations.select);
storeRouter.post('/rack', rackOperations.insert);
storeRouter.put('/rack/:uuid', rackOperations.update);
storeRouter.delete('/rack/:uuid', validateUuidParam(), rackOperations.remove);

//* room routes *//

storeRouter.get('/room', roomOperations.selectAll);
storeRouter.get('/room/:uuid', validateUuidParam(), roomOperations.select);
storeRouter.post('/room', roomOperations.insert);
storeRouter.put('/room/:uuid', roomOperations.update);
storeRouter.delete('/room/:uuid', validateUuidParam(), roomOperations.remove);

//* stock routes *//

storeRouter.get('/stock', stockOperations.selectAll);
storeRouter.get('/stock/:uuid', validateUuidParam(), stockOperations.select);
storeRouter.post('/stock', stockOperations.insert);
storeRouter.put('/stock/:uuid', stockOperations.update);
storeRouter.delete('/stock/:uuid', validateUuidParam(), stockOperations.remove);

//* warehouse routes *//

storeRouter.get('/warehouse', warehouseOperations.selectAll);
storeRouter.get(
	'/warehouse/:uuid',
	validateUuidParam(),
	warehouseOperations.select
);
storeRouter.post('/warehouse', warehouseOperations.insert);
storeRouter.put('/warehouse/:uuid', warehouseOperations.update);
storeRouter.delete(
	'/warehouse/:uuid',
	validateUuidParam(),
	warehouseOperations.remove
);

export { storeRouter };
