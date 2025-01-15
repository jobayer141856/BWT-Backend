import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { box, floor } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const boxPromise = db
		.insert(box)
		.values(req.body)
		.returning({ insertedName: box.name });

	try {
		const data = await boxPromise;
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

	const boxPromise = db
		.update(box)
		.set(req.body)
		.where(eq(box.uuid, req.params.uuid))
		.returning({ updatedName: box.name });

	try {
		const data = await boxPromise;
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

	const boxPromise = db
		.delete(box)
		.where(eq(box.uuid, req.params.uuid))
		.returning({ deletedName: box.name });

	try {
		const data = await boxPromise;
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
	const boxPromise = db
		.select({
			uuid: box.uuid,
			name: box.name,
			floor_uuid: box.floor_uuid,
			floor_name: floor.name,
			created_by: box.created_by,
			created_by_name: hrSchema.users.name,
			created_at: box.created_at,
			updated_at: box.updated_at,
			remarks: box.remarks,
		})
		.from(box)
		.leftJoin(floor, eq(box.floor_uuid, floor.uuid))
		.leftJoin(hrSchema.users, eq(box.created_by, hrSchema.users.uuid))
		.orderBy(desc(box.created_at));

	try {
		const data = await boxPromise;

		const toast = {
			status: 200,
			type: 'select all',
			message: 'boxes list',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const boxPromise = db
		.select({
			uuid: box.uuid,
			name: box.name,
			floor_uuid: box.floor_uuid,
			floor_name: floor.name,
			created_by: box.created_by,
			created_by_name: hrSchema.users.name,
			created_at: box.created_at,
			updated_at: box.updated_at,
			remarks: box.remarks,
		})
		.from(box)
		.leftJoin(hrSchema.users, eq(box.created_by, hrSchema.users.uuid))
		.leftJoin(floor, eq(box.floor_uuid, floor.uuid))
		.where(eq(box.uuid, req.params.uuid));

	try {
		const data = await boxPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'box',
		};

		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
