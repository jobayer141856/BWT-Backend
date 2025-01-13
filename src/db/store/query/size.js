import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';

import { size } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const sizePromise = db
		.insert(size)
		.values(req.body)
		.returning({ insertedName: size.name });

	try {
		const data = await sizePromise;

		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedName} inserted`,
		};

		return res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const sizePromise = db
		.update(size)
		.set(req.body)
		.where(eq(size.uuid, req.params.uuid))
		.returning({ updatedName: size.name });

	try {
		const data = await sizePromise;

		const toast = {
			status: 201,
			type: 'update',
			message: `${data[0].updatedName} updated`,
		};

		return res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const sizePromise = db
		.delete(size)
		.where(eq(size.uuid, req.params.uuid))
		.returning({ deletedName: size.name });

	try {
		const data = await sizePromise;

		const toast = {
			status: 201,
			type: 'delete',
			message: `${data[0].deletedName} deleted`,
		};

		return res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	const sizePromise = db
		.select({
			uuid: size.uuid,
			name: size.name,
			created_by: size.created_by,
			created_by_name: hrSchema.users.name,
			created_at: size.created_at,
			updated_at: size.updated_at,
			remarks: size.remarks,
		})
		.from(size)
		.leftJoin(hrSchema.users, eq(size.created_by, hrSchema.users.uuid))
		.orderBy(desc(size.created_at));

	try {
		const data = await sizePromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'sizes list',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const sizePromise = db
		.select({
			uuid: size.uuid,
			name: size.name,
			created_by: size.created_by,
			created_by_name: hrSchema.users.name,
			created_at: size.created_at,
			updated_at: size.updated_at,
			remarks: size.remarks,
		})
		.from(size)
		.leftJoin(hrSchema.users, eq(size.created_by, hrSchema.users.uuid))
		.where(eq(size.uuid, req.params.uuid));

	try {
		const data = await sizePromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'size',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
