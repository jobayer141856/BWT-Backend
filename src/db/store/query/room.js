import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';

import { room, warehouse } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const roomPromise = db
		.insert(room)
		.values(req.body)
		.returning({ insertedName: room.name });

	try {
		const data = await roomPromise;
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

	const roomPromise = db
		.update(room)
		.set(req.body)
		.where(eq(room.uuid, req.params.uuid))
		.returning({ updatedName: room.name });

	try {
		const data = await roomPromise;
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

	const roomPromise = db
		.delete(room)
		.where(eq(room.uuid, req.params.uuid))
		.returning({ deletedName: room.name });

	try {
		const data = await roomPromise;
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
	const roomPromise = db
		.select({
			uuid: room.uuid,
			name: room.name,
			warehouse_uuid: room.warehouse_uuid,
			warehouse_name: warehouse.name,
			created_by: room.created_by,
			created_by_name: hrSchema.users.name,
			created_at: room.created_at,
			updated_at: room.updated_at,
			remarks: room.remarks,
		})
		.from(room)
		.leftJoin(warehouse, eq(room.warehouse_uuid, warehouse.uuid))
		.leftJoin(hrSchema.users, eq(room.created_by, hrSchema.users.uuid))
		.orderBy(desc(room.created_at));

	try {
		const data = await roomPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'rooms list',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const roomPromise = db
		.select({
			uuid: room.uuid,
			name: room.name,
			warehouse_uuid: room.warehouse_uuid,
			warehouse_name: warehouse.name,
			created_by: room.created_by,
			created_by_name: hrSchema.users.name,
			created_at: room.created_at,
			updated_at: room.updated_at,
			remarks: room.remarks,
		})
		.from(room)
		.leftJoin(warehouse, eq(room.warehouse_uuid, warehouse.uuid))
		.leftJoin(hrSchema.users, eq(room.created_by, hrSchema.users.uuid))
		.where(eq(room.uuid, req.params.uuid));

	try {
		const data = await roomPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'room',
		};
		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
