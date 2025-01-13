import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../hr/schema.js';
import { group } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const groupPromise = db
		.insert(group)
		.values(req.body)
		.returning({ insertedName: group.name });

	try {
		const data = await groupPromise;
		const toast = {
			status: 201,
			type: 'create',
			message: `${data[0].insertedName} created`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const groupPromise = db
		.update(group)
		.set(req.body)
		.where(eq(group.uuid, req.params.uuid))
		.returning({ updatedName: group.name });

	try {
		const data = await groupPromise;
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

	const groupPromise = db
		.delete(group)
		.where(eq(group.uuid, req.params.uuid))
		.returning({ deletedName: group.name });

	try {
		const data = await groupPromise;
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
	const resultPromise = db
		.select({
			uuid: group.uuid,
			name: group.name,
			created_by: group.created_by,
			created_by_name: hrSchema.users.name,
			created_at: group.created_at,
			updated_at: group.updated_at,
			remarks: group.remarks,
		})
		.from(group)
		.leftJoin(hrSchema.users, eq(group.created_by, hrSchema.users.uuid))
		.orderBy(desc(group.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'groups list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const resultPromise = db
		.select({
			uuid: group.uuid,
			name: group.name,
			created_by: group.created_by,
			created_by_name: hrSchema.users.name,
			created_at: group.created_at,
			updated_at: group.updated_at,
			remarks: group.remarks,
		})
		.from(group)
		.leftJoin(hrSchema.users, eq(group.created_by, hrSchema.users.uuid))
		.where(eq(group.uuid, req.params.uuid));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'group',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
