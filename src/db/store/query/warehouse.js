import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';

import { branch, brand, warehouse } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const warehousePromise = db
		.insert(warehouse)
		.values(req.body)
		.returning({ insertedName: warehouse.name });

	try {
		const data = await warehousePromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedName} inserted`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const warehousePromise = db
		.update(warehouse)
		.set(req.body)
		.where(eq(warehouse.uuid, req.params.uuid))
		.returning({ updatedName: warehouse.name });

	try {
		const data = await warehousePromise;
		const toast = {
			status: 201,
			type: 'update',
			message: `${data[0].updatedName} updated`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const warehousePromise = db
		.delete(warehouse)
		.where(eq(warehouse.uuid, req.params.uuid))
		.returning({ deletedName: warehouse.name });

	try {
		const data = await warehousePromise;
		const toast = {
			status: 201,
			type: 'delete',
			message: `${data[0].deletedName} deleted`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	const warehousePromise = db
		.select({
			uuid: warehouse.uuid,
			name: warehouse.name,
			branch_uuid: warehouse.branch_uuid,
			branch_name: branch.name,
			created_by: warehouse.created_by,
			created_by_name: hrSchema.users.name,
			created_at: warehouse.created_at,
			updated_at: warehouse.created_at,
			remarks: warehouse.remarks,
		})
		.from(warehouse)
		.leftJoin(branch, eq(warehouse.branch_uuid, branch.uuid))
		.leftJoin(hrSchema.users, eq(warehouse.created_by, hrSchema.users.uuid))
		.orderBy(desc(warehouse.created_at));

	try {
		const data = await warehousePromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'warehouses list',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const warehousePromise = db
		.select({
			uuid: warehouse.uuid,
			name: warehouse.name,
			branch_uuid: warehouse.branch_uuid,
			branch_name: branch.name,
			created_by: warehouse.created_by,
			created_by_name: hrSchema.users.name,
			created_at: warehouse.created_at,
			updated_at: warehouse.updated_at,
			remarks: warehouse.remarks,
		})
		.from(warehouse)
		.leftJoin(branch, eq(warehouse.branch_uuid, branch.uuid))
		.leftJoin(hrSchema.users, eq(warehouse.created_by, hrSchema.users.uuid))
		.where(eq(warehouse.uuid, req.params.uuid));

	try {
		const data = await warehousePromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'warehouse',
		};
		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
