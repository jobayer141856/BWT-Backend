import { Router } from 'express';

import * as otherOperations from './query/query.js';

const otherRouter = Router();

//* HR others routes *//
// user
otherRouter.get('/user/value/label', otherOperations.selectUser);
otherRouter.get(
	'/hr/users-can-access/value/label',
	otherOperations.selectUserWithCanAccess
);
// designation routes
otherRouter.get('/designation/value/label', otherOperations.selectDesignation);

// department routes
otherRouter.get('/department/value/label', otherOperations.selectDepartment);

//* HRM others routes *//

// ? sub department routes
otherRouter.get(
	'/sub-department/value/label',
	otherOperations.selectSubDepartment
);

// ? workplace routes
otherRouter.get('/workplace/value/label', otherOperations.selectWorkplace);

// ? Employment Type
otherRouter.get(
	'/employment-type/value/label',
	otherOperations.selectEmploymentType
);

// ? Shift routes
otherRouter.get('/shift/value/label', otherOperations.selectShifts);

// ? Shift Group routes
otherRouter.get('/shift-group/value/label', otherOperations.selectShiftGroup);

// ? Leave Policy routes
otherRouter.get('/leave-policy/value/label', otherOperations.selectLeavePolicy);

// ? Leave Category routes
otherRouter.get(
	'/leave-category/value/label',
	otherOperations.selectLeaveCategory
);

// ? Employee routes
otherRouter.get('/employee/value/label', otherOperations.selectEmployee);

// ? Device List routes
otherRouter.get('/device-list/value/label', otherOperations.selectDeviceList);

//* Store others routes *//
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

// purchase routes
otherRouter.get('/purchase/value/label', otherOperations.selectPurchase);

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

// purchase return routes
otherRouter.get(
	'/purchase-return/value/label',
	otherOperations.selectPurchaseReturn
);
//otherRouter.get('/purchase/value/label', otherOperations.selectPurchase);

// purchase return entry routes

// otherRouter.get(
// 	'/purchase-return-entry/value/label',
// 	otherOperations.selectPurchaseReturnEntry
// );

// internal transfer routes

otherRouter.get(
	'/internal-transfer/value/label',
	otherOperations.selectInternalTransfer
);

otherRouter.get('/model/value/label', otherOperations.selectModel);

//* Work others routes *//

// problem routes
otherRouter.get('/problem/value/label', otherOperations.selectProblem);

// order routes
otherRouter.get('/order/value/label', otherOperations.selectOrder);

// diagnosis routes
otherRouter.get('/diagnosis/value/label', otherOperations.selectDiagnosis);

// section routes
otherRouter.get('/section/value/label', otherOperations.selectSection);

// process routes
otherRouter.get('/process/value/label', otherOperations.selectProcess);

// accessory routes

otherRouter.get('/accessory/value/label', otherOperations.selectAccessory);

// zone routes

otherRouter.get('/zone/value/label', otherOperations.selectZone);

//* Delivery others routes *//

// Vehicle routes
otherRouter.get('/vehicle/value/label', otherOperations.selectVehicle);

// Courier routes
otherRouter.get('/courier/value/label', otherOperations.selectCourier);

export { otherRouter };
