import { Router } from 'express';

import * as otherOperations from './query/query.js';

const otherRouter = Router();

//* others routes *//

// designation routes
otherRouter.get('/designation/value/label', otherOperations.selectDesignation);

// department routes
otherRouter.get('/department/value/label', otherOperations.selectDepartment);

// group routes
otherRouter.get('/group/value/label', otherOperations.selectGroup);

// category routes
otherRouter.get('/category/value/label', otherOperations.selectCategory);

// brand routes
otherRouter.get('/brand/value/label', otherOperations.selectBrand);

// size routes
otherRouter.get('/size/value/label', otherOperations.selectSize);

// vendor routes
otherRouter.get('/vendor/value/label', otherOperations.selectVendor);

// product routes
otherRouter.get('/product/value/label', otherOperations.selectProduct);

// branch routes
otherRouter.get('/branch/value/label', otherOperations.selectBranch);

// // purchase routes
// otherRouter.get('/purchase/value/label', otherOperations.selectPurchase);

// stock routes
otherRouter.get('/stock/value/label', otherOperations.selectStock);

// purchase entry routes
// otherRouter.get(
// 	'/purchase-entry/value/label',
// 	otherOperations.selectPurchaseEntry
// );

// warehouse routes
otherRouter.get('/warehouse/value/label', otherOperations.selectWarehouse);

// room routes
otherRouter.get('/room/value/label', otherOperations.selectRoom);

// rack routes
otherRouter.get('/rack/value/label', otherOperations.selectRack);

// floor routes
otherRouter.get('/floor/value/label', otherOperations.selectFloor);

// box routes
otherRouter.get('/box/value/label', otherOperations.selectBox);

export { otherRouter };
