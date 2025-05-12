import { sql, eq, and, is, or } from 'drizzle-orm';
import db from '../../index.js';
import { handleError, validateRequest } from '../../../util/index.js';
import * as hrSchema from '../../hr/schema.js';
import * as storeSchema from '../../store/schema.js';
import * as workSchema from '../../work/schema.js';
import * as deliverySchema from '../../delivery/schema.js';
import { decimalToNumber } from '../../variables.js';

//* HR others routes *//

export async function selectUser(req, res, next) {
	const {
		type,
		designation,
		department,
		is_ready_for_delivery,
		is_delivery_complete,
		challan_uuid,
	} = req.query;

	//console.log(type, designation, department);

	const userPromise = db
		.select({
			value: hrSchema.users.uuid,
			label:
				type === 'customer'
					? sql`CONCAT(${hrSchema.users.name}, '-', ${hrSchema.users.phone})`
					: hrSchema.users.name,
			...(type === 'customer' && {
				zone_uuid: sql`MAX(${workSchema.info.zone_uuid})`,
				zone_name: sql`MAX(${workSchema.zone.name})`,
				location: sql`MAX(${workSchema.info.location})`,
			}),
		})
		.from(hrSchema.users)
		.leftJoin(
			hrSchema.designation,
			eq(hrSchema.users.designation_uuid, hrSchema.designation.uuid)
		)
		.leftJoin(
			hrSchema.department,
			eq(hrSchema.users.department_uuid, hrSchema.department.uuid)
		)
		.leftJoin(
			workSchema.info,
			eq(hrSchema.users.uuid, workSchema.info.user_uuid)
		)
		.leftJoin(
			workSchema.order,
			eq(workSchema.info.uuid, workSchema.order.info_uuid)
		)
		.leftJoin(
			workSchema.zone,
			eq(workSchema.info.zone_uuid, workSchema.zone.uuid)
		)
		.leftJoin(
			deliverySchema.challan,
			eq(hrSchema.users.uuid, deliverySchema.challan.customer_uuid)
		)
		.groupBy(
			hrSchema.users.uuid,
			hrSchema.users.name,
			hrSchema.users.phone
		);

	const filters = [];
	if (type) {
		filters.push(
			eq(
				sql`LOWER(CAST(${hrSchema.users.user_type} AS TEXT))`,
				type.toLowerCase()
			)
		);
	}
	if (department) {
		filters.push(
			eq(
				sql`LOWER(${hrSchema.department.department})`,
				department.toLowerCase()
			)
		);
	}
	if (designation) {
		filters.push(
			eq(
				sql`LOWER(${hrSchema.designation.designation})`,
				designation.toLowerCase()
			)
		);
	}
	if (is_ready_for_delivery && is_delivery_complete) {
		filters.push(
			or(
				eq(
					workSchema.order.is_ready_for_delivery,
					is_ready_for_delivery
				),
				eq(
					deliverySchema.challan.is_delivery_complete,
					is_delivery_complete
				)
			)
		);
	}
	if (challan_uuid) {
		filters.push(eq(deliverySchema.challan.uuid, challan_uuid));
	}

	if (filters.length > 0) {
		userPromise.where(and(...filters));
	}

	try {
		const data = await userPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'User list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectUserWithCanAccess(req, res, next) {
	const userPromise = db
		.select({
			value: hrSchema.users.uuid,
			label: hrSchema.users.name,
			can_access: hrSchema.users.can_access,
		})
		.from(hrSchema.users);

	try {
		const data = await userPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'User list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectDesignation(req, res, next) {
	const designationPromise = db
		.select({
			value: hrSchema.designation.uuid,
			label: hrSchema.designation.designation,
		})
		.from(hrSchema.designation);

	try {
		const data = await designationPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Designation list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectDepartment(req, res, next) {
	const departmentPromise = db
		.select({
			value: hrSchema.department.uuid,
			label: hrSchema.department.department,
		})
		.from(hrSchema.department);

	try {
		const data = await departmentPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Department list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

//* Store others routes *//

export async function selectGroup(req, res, next) {
	const groupPromise = db
		.select({
			value: storeSchema.group.uuid,
			label: storeSchema.group.name,
		})
		.from(storeSchema.group);

	try {
		const data = await groupPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Group list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectCategory(req, res, next) {
	const categoryPromise = db
		.select({
			value: storeSchema.category.uuid,
			label: storeSchema.category.name,
		})
		.from(storeSchema.category);

	try {
		const data = await categoryPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Category list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectBrand(req, res, next) {
	const brandPromise = db
		.select({
			value: storeSchema.brand.uuid,
			label: storeSchema.brand.name,
		})
		.from(storeSchema.brand);

	try {
		const data = await brandPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Brand list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectSize(req, res, next) {
	const sizePromise = db
		.select({
			value: storeSchema.size.uuid,
			label: storeSchema.size.name,
		})
		.from(storeSchema.size);

	try {
		const data = await sizePromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Size list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectVendor(req, res, next) {
	const vendorPromise = db
		.select({
			value: storeSchema.vendor.uuid,
			label: storeSchema.vendor.name,
		})
		.from(storeSchema.vendor);

	try {
		const data = await vendorPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Vendor list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectProduct(req, res, next) {
	const productPromise = db
		.select({
			value: storeSchema.product.uuid,
			label: storeSchema.product.name,
			warehouse_1: decimalToNumber(storeSchema.product.warehouse_1),
			warehouse_2: decimalToNumber(storeSchema.product.warehouse_2),
			warehouse_3: decimalToNumber(storeSchema.product.warehouse_3),
			warehouse_4: decimalToNumber(storeSchema.product.warehouse_4),
			warehouse_5: decimalToNumber(storeSchema.product.warehouse_5),
			warehouse_6: decimalToNumber(storeSchema.product.warehouse_6),
			warehouse_7: decimalToNumber(storeSchema.product.warehouse_7),
			warehouse_8: decimalToNumber(storeSchema.product.warehouse_8),
			warehouse_9: decimalToNumber(storeSchema.product.warehouse_9),
			warehouse_10: decimalToNumber(storeSchema.product.warehouse_10),
			warehouse_11: decimalToNumber(storeSchema.product.warehouse_11),
			warehouse_12: decimalToNumber(storeSchema.product.warehouse_12),
		})
		.from(storeSchema.product);

	try {
		const data = await productPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Product list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectBranch(req, res, next) {
	const branchPromise = db
		.select({
			value: storeSchema.branch.uuid,
			label: storeSchema.branch.name,
		})
		.from(storeSchema.branch);

	try {
		const data = await branchPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Branch list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectStock(req, res, next) {
	const stockPromise = db
		.select({
			value: storeSchema.stock.uuid,
			label: sql`CONCAT(
                'SS',
                TO_CHAR(${storeSchema.stock.created_at}, 'YY'),
                ' - ',
                TO_CHAR(${storeSchema.stock.id}, 'FM0000')
			)`,
		})
		.from(storeSchema.stock);

	try {
		const data = await stockPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Stock list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectWarehouse(req, res, next) {
	const { branch_uuid, product_uuid } = req.query;
	const warehousePromise = db
		.select({
			value: storeSchema.warehouse.uuid,
			label: sql`CONCAT( ${storeSchema.warehouse.name}, '(', ${storeSchema.branch.name}, ')' )`,
			assigned: storeSchema.warehouse.assigned,
			warehouse_name: storeSchema.warehouse.name,
			branch_name: storeSchema.branch.name,
		})
		.from(storeSchema.warehouse)
		.leftJoin(
			storeSchema.branch,
			eq(storeSchema.warehouse.branch_uuid, storeSchema.branch.uuid)
		);

	if (branch_uuid) {
		warehousePromise.where(
			eq(storeSchema.warehouse.branch_uuid, branch_uuid)
		);
	}

	try {
		const data = await warehousePromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Warehouse list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectRoom(req, res, next) {
	const roomPromise = db
		.select({
			value: storeSchema.room.uuid,
			label: storeSchema.room.name,
		})
		.from(storeSchema.room);

	try {
		const data = await roomPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Room list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectRack(req, res, next) {
	const rackPromise = db
		.select({
			value: storeSchema.rack.uuid,
			label: storeSchema.rack.name,
		})
		.from(storeSchema.rack);

	try {
		const data = await rackPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Rack list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectFloor(req, res, next) {
	const floorPromise = db
		.select({
			value: storeSchema.floor.uuid,
			label: storeSchema.floor.name,
		})
		.from(storeSchema.floor);

	try {
		const data = await floorPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Floor list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectBox(req, res, next) {
	const boxPromise = db
		.select({
			value: storeSchema.box.uuid,
			label: storeSchema.box.name,
		})
		.from(storeSchema.box);

	try {
		const data = await boxPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Box list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectPurchaseReturn(req, res, next) {
	const purchaseReturnPromise = db
		.select({
			value: storeSchema.purchase_return.uuid,
			label: sql`CONCAT(
				'SPR',
				TO_CHAR(${storeSchema.purchase_return.created_at}, 'YY'),
				' - ',
				TO_CHAR(${storeSchema.purchase_return.id}, 'FM0000')
			)`,
		})
		.from(storeSchema.purchase_return);

	try {
		const data = await purchaseReturnPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Purchase Return list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
export async function selectPurchase(req, res, next) {
	const purchasePromise = db
		.select({
			value: storeSchema.purchase.uuid,
			label: sql`CONCAT(
				'SPR',
				TO_CHAR(${storeSchema.purchase.created_at}, 'YY'),
				' - ',
				TO_CHAR(${storeSchema.purchase.id}, 'FM0000')
			)`,
		})
		.from(storeSchema.purchase);

	try {
		const data = await purchasePromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Purchase list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectInternalTransfer(req, res, next) {
	const internalTransferPromise = db
		.select({
			value: storeSchema.internal_transfer.uuid,
			label: sql`CONCAT(
				'SIT',
				TO_CHAR(${storeSchema.internal_transfer.created_at}, 'YY'),
				' - ',
				TO_CHAR(${storeSchema.internal_transfer.id}, 'FM0000')
			)`,
		})
		.from(storeSchema.internal_transfer);

	try {
		const data = await internalTransferPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Internal Transfer list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectModel(req, res, next) {
	const { is_brand, brand_uuid } = req.query;
	const modelPromise = db
		.select({
			value: storeSchema.model.uuid,
			label:
				is_brand === 'false'
					? storeSchema.model.name
					: sql`CONCAT(${storeSchema.model.name}, '(', ${storeSchema.brand.name}, ')')`,
		})
		.from(storeSchema.model)
		.leftJoin(
			storeSchema.brand,
			eq(storeSchema.model.brand_uuid, storeSchema.brand.uuid)
		);

	if (brand_uuid) {
		modelPromise.where(eq(storeSchema.model.brand_uuid, brand_uuid));
	}

	try {
		const data = await modelPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Model list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

//* Work others routes *//

export async function selectProblem(req, res, next) {
	const { category } = req.query;
	const problemPromise = db
		.select({
			value: workSchema.problem.uuid,
			label: workSchema.problem.name,
		})
		.from(workSchema.problem);

	const filters = [];
	if (category) {
		filters.push(eq(workSchema.problem.category, category));
	}

	if (filters.length > 0) {
		problemPromise.where(and(...filters));
	}

	try {
		const data = await problemPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Problem list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectOrder(req, res, next) {
	const orderPromise = db
		.select({
			value: workSchema.order.uuid,
			label: sql`CONCAT(
            'WO',
            TO_CHAR(${workSchema.order.created_at}, 'YY'),
            ' - ',
            TO_CHAR(${workSchema.order.id}, 'FM0000'),
            ' (',
            'WI',
            TO_CHAR(${workSchema.info.created_at}, 'YY'),
            ' - ',
            TO_CHAR(${workSchema.info.id}, 'FM0000'),
            ')' , ' - ' ,${hrSchema.users.name} ,' - ' ,${hrSchema.users.phone}
        )`,
		})
		.from(workSchema.order)
		.leftJoin(
			workSchema.info,
			eq(workSchema.order.info_uuid, workSchema.info.uuid)
		)
		.leftJoin(
			hrSchema.users,
			eq(workSchema.info.user_uuid, hrSchema.users.uuid)
		);

	try {
		const data = await orderPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Order list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectDiagnosis(req, res, next) {
	const diagnosisPromise = db
		.select({
			value: workSchema.diagnosis.uuid,
			label: sql`CONCAT(
				'WD',
				TO_CHAR(${workSchema.diagnosis.created_at}, 'YY'),
				' - ',
				TO_CHAR(${workSchema.diagnosis.id}, 'FM0000')
			)`,
		})
		.from(workSchema.diagnosis);

	try {
		const data = await diagnosisPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Diagnosis list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectSection(req, res, next) {
	const sectionPromise = db
		.select({
			value: workSchema.section.uuid,
			label: workSchema.section.name,
		})
		.from(workSchema.section);

	try {
		const data = await sectionPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Section list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectProcess(req, res, next) {
	const processPromise = db
		.select({
			value: workSchema.process.uuid,
			label: sql`CONCAT(
				'WP',
				TO_CHAR(${workSchema.process.created_at}, 'YY'),
				' - ',
				TO_CHAR(${workSchema.process.id}, 'FM0000')
			)`,
		})
		.from(workSchema.process);

	try {
		const data = await processPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Process list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAccessory(req, res, next) {
	const accessoryPromise = db
		.select({
			value: workSchema.accessory.uuid,
			label: workSchema.accessory.name,
		})
		.from(workSchema.accessory);

	try {
		const data = await accessoryPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Accessory list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectZone(req, res, next) {
	const zonePromise = db
		.select({
			value: workSchema.zone.uuid,
			label: workSchema.zone.name,
		})
		.from(workSchema.zone);

	try {
		const data = await zonePromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Zone list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

//* Delivery others routes *//

export async function selectCourier(req, res, next) {
	const courierPromise = db
		.select({
			value: deliverySchema.courier.uuid,
			label: sql`CONCAT(${deliverySchema.courier.name}, '-', ${deliverySchema.courier.branch})`,
		})
		.from(deliverySchema.courier);

	try {
		const data = await courierPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Courier list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectVehicle(req, res, next) {
	const vehiclePromise = db
		.select({
			value: deliverySchema.vehicle.uuid,
			label: deliverySchema.vehicle.name,
		})
		.from(deliverySchema.vehicle);

	try {
		const data = await vehiclePromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Vehicle list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
