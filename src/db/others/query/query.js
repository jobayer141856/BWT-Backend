import { sql } from 'drizzle-orm';
import db from '../../index.js';

import * as storeSchema from '../../store/schema.js';
import * as hrSchema from '../../hr/schema.js';

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
	const warehousePromise = db
		.select({
			value: storeSchema.warehouse.uuid,
			label: storeSchema.warehouse.name,
		})
		.from(storeSchema.warehouse);

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
