import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';

import { accessory } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const accessoryPromise = db
		.insert(accessory)
		.values(req.body)
		.returning({ insertedName: accessory.name });

	try {
		const data = await accessoryPromise;
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

	const accessoryPromise = db
		.update(accessory)
		.set(req.body)
		.where(eq(accessory.uuid, req.params.uuid))
		.returning({ updatedName: accessory.name });

	try {
		const data = await accessoryPromise;
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

	const accessoryPromise = db
		.delete(accessory)
		.where(eq(accessory.uuid, req.params.uuid))
		.returning({ deletedName: accessory.name });

	try {
		const data = await accessoryPromise;
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
	const accessoryPromise = db
		.select({
			uuid: accessory.uuid,
			name: accessory.name,
			created_by: accessory.created_by,
			created_by_name: hrSchema.users.name,
			created_at: accessory.created_at,
			updated_at: accessory.updated_at,
			remarks: accessory.remarks,
		})
		.from(accessory)
		.leftJoin(hrSchema.users, eq(accessory.created_by, hrSchema.users.uuid))
		.orderBy(desc(accessory.created_at));

	try {
		const data = await accessoryPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'accessories list',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const accessoryPromise = db
		.select({
			uuid: accessory.uuid,
			name: accessory.name,
			category: accessory.category,
			created_by: accessory.created_by,
			created_by_name: hrSchema.users.name,
			created_at: accessory.created_at,
			updated_at: accessory.updated_at,
			remarks: accessory.remarks,
		})
		.from(accessory)
		.leftJoin(hrSchema.users, eq(accessory.created_by, hrSchema.users.uuid))
		.where(eq(accessory.uuid, req.params.uuid));

	try {
		const data = await accessoryPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'accessory',
		};

		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
