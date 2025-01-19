import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';

import { rack, warehouse } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const rackPromise = db
		.insert(rack)
		.values(req.body)
		.returning({ insertedName: rack.name });

	try {
		const data = await rackPromise;
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

	const rackPromise = db
		.update(rack)
		.set(req.body)
		.where(eq(rack.uuid, req.params.uuid))
		.returning({ updatedName: rack.name });

	try {
		const data = await rackPromise;
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

	const rackPromise = db
		.delete(rack)
		.where(eq(rack.uuid, req.params.uuid))
		.returning({ deletedName: rack.name });

	try {
		const data = await rackPromise;
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
	const rackPromise = db
		.select({
			uuid: rack.uuid,
			name: rack.name,
			warehouse_uuid: rack.warehouse_uuid,
			warehouse_name: warehouse.name,
			created_by: rack.created_by,
			created_by_name: hrSchema.users.name,
			created_at: rack.created_at,
			updated_at: rack.updated_at,
			remarks: rack.remarks,
		})
		.from(rack)
		.leftJoin(warehouse, eq(rack.warehouse_uuid, warehouse.uuid))
		.leftJoin(hrSchema.users, eq(rack.created_by, hrSchema.users.uuid))
		.orderBy(desc(rack.created_at));

	try {
		const data = await rackPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'racks list',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const rackPromise = db
		.select({
			uuid: rack.uuid,
			name: rack.name,
			warehouse_uuid: rack.warehouse_uuid,
			warehouse_name: warehouse.name,
			created_by: rack.created_by,
			created_at: rack.created_at,
			updated_at: rack.updated_at,
			remarks: rack.remarks,
		})
		.from(rack)
		.leftJoin(warehouse, eq(rack.warehouse_uuid, warehouse.uuid))
		.leftJoin(hrSchema.users, eq(rack.created_by, hrSchema.users.uuid))
		.where(eq(rack.uuid, req.params.uuid));

	try {
		const data = await rackPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'rack',
		};

		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
