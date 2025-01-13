import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';

import { floor, rack } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const floorPromise = db
		.insert(floor)
		.values(req.body)
		.returning({ insertedName: floor.name });

	try {
		const data = await floorPromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedName} created`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const floorPromise = db
		.update(floor)
		.set(req.body)
		.where(eq(floor.uuid, req.params.uuid))
		.returning({ updatedName: floor.name });

	try {
		const data = await floorPromise;
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

	const floorPromise = db
		.delete(floor)
		.where(eq(floor.uuid, req.params.uuid))
		.returning({ deletedName: floor.name });

	try {
		const data = await floorPromise;
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
	const floorPromise = db
		.select({
			uuid: floor.uuid,
			name: floor.name,
			rack_uuid: floor.rack_uuid,
			rack_name: rack.name,
			created_by: floor.created_by,
			created_by_name: hrSchema.users.name,
			created_at: floor.created_at,
			updated_at: floor.updated_at,
			remarks: floor.remarks,
		})
		.from(floor)
		.leftJoin(rack, eq(floor.rack_uuid, rack.uuid))
		.leftJoin(hrSchema.users, eq(floor.created_by, hrSchema.users.uuid))
		.orderBy(desc(floor.created_at));

	try {
		const data = await floorPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'floors list',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const floorPromise = db
		.select({
			uuid: floor.uuid,
			name: floor.name,
			rack_uuid: floor.rack_uuid,
			rack_name: rack.name,
			created_by: floor.created_by,
			created_by_name: hrSchema.users.name,
			created_at: floor.created_at,
			updated_at: floor.updated_at,
			remarks: floor.remarks,
		})
		.from(floor)
		.leftJoin(hrSchema.users, eq(floor.created_by, hrSchema.users.uuid))
		.where(eq(floor.uuid, req.params.uuid));

	try {
		const data = await floorPromise;

		const toast = {
			status: 200,
			type: 'select',
			message: 'floor',
		};
		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
